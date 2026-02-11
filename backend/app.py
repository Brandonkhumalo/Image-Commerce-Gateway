import os
import sqlite3
import uuid
import json
from flask import Flask, request, jsonify, send_from_directory, send_file
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__, static_folder=None)
CORS(app)

DB_PATH = os.path.join(os.path.dirname(__file__), "dmac.db")


def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA journal_mode=WAL")
    return conn


def init_db():
    conn = get_db()
    conn.executescript("""
        CREATE TABLE IF NOT EXISTS services (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            description TEXT NOT NULL,
            short_description TEXT NOT NULL,
            price REAL NOT NULL,
            duration TEXT,
            image TEXT NOT NULL,
            category TEXT NOT NULL,
            featured INTEGER DEFAULT 0
        );
        CREATE TABLE IF NOT EXISTS products (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            description TEXT NOT NULL,
            price REAL NOT NULL,
            image TEXT NOT NULL,
            category TEXT NOT NULL,
            in_stock INTEGER DEFAULT 1
        );
        CREATE TABLE IF NOT EXISTS orders (
            id TEXT PRIMARY KEY,
            customer_name TEXT NOT NULL,
            customer_email TEXT NOT NULL,
            customer_phone TEXT NOT NULL,
            total_amount REAL NOT NULL,
            status TEXT NOT NULL DEFAULT 'pending',
            poll_url TEXT,
            paynow_reference TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        CREATE TABLE IF NOT EXISTS order_items (
            id TEXT PRIMARY KEY,
            order_id TEXT NOT NULL,
            product_id TEXT NOT NULL,
            product_name TEXT NOT NULL,
            quantity INTEGER NOT NULL DEFAULT 1,
            price REAL NOT NULL,
            FOREIGN KEY (order_id) REFERENCES orders(id)
        );
        CREATE TABLE IF NOT EXISTS testimonials (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            role TEXT,
            content TEXT NOT NULL,
            rating INTEGER NOT NULL DEFAULT 5
        );
    """)
    conn.commit()
    conn.close()


def seed_db():
    conn = get_db()
    count = conn.execute("SELECT COUNT(*) FROM services").fetchone()[0]
    if count > 0:
        conn.close()
        return

    print("Seeding database...")

    services_data = [
        (str(uuid.uuid4()), "Personal Fitness Training",
         "One-on-one sessions with our certified personal trainers. Get a customised workout plan designed to help you reach your specific fitness goals, whether it's weight loss, muscle building, or improving overall health.",
         "Customised one-on-one training sessions with certified professionals.",
         45.00, "60 min", "/images/service-fitness.png", "Fitness", 1),
        (str(uuid.uuid4()), "Group Fitness Classes",
         "Join our energising group classes including HIIT, Zumba, aerobics, and circuit training. Perfect for those who thrive in a motivating group environment with expert-led routines.",
         "High-energy group workouts led by expert instructors.",
         15.00, "45 min", "/images/service-group.png", "Fitness", 0),
        (str(uuid.uuid4()), "Yoga & Meditation",
         "Find inner peace and flexibility with our yoga and meditation sessions. From beginner Hatha yoga to advanced Vinyasa flows, our instructors guide you through mindful practices for mental clarity and physical wellness.",
         "Mindful yoga and meditation for inner peace and flexibility.",
         25.00, "60 min", "/images/service-yoga.png", "Wellness", 1),
        (str(uuid.uuid4()), "Spa & Massage Therapy",
         "Relax and rejuvenate with our premium spa treatments. Choose from Swedish massage, deep tissue therapy, hot stone treatments, and aromatherapy sessions designed to melt away stress.",
         "Premium spa treatments and therapeutic massage sessions.",
         65.00, "90 min", "/images/service-spa.png", "Wellness", 1),
        (str(uuid.uuid4()), "Nutritional Counselling",
         "Work with our certified nutritionists to develop a personalised eating plan. Whether you want to lose weight, manage a health condition, or simply eat healthier, we'll guide you every step of the way.",
         "Personalised meal plans and nutritional guidance.",
         35.00, "45 min", "/images/service-nutrition.png", "Nutrition", 0),
        (str(uuid.uuid4()), "Lifestyle Coaching",
         "Our certified life coaches help you set and achieve meaningful goals. From career transitions to personal development, gain the tools and strategies needed to create the life you envision.",
         "Goal-setting and personal development coaching.",
         55.00, "60 min", "/images/service-coaching.png", "Coaching", 0),
    ]

    conn.executemany(
        "INSERT INTO services (id, name, description, short_description, price, duration, image, category, featured) VALUES (?,?,?,?,?,?,?,?,?)",
        services_data
    )

    products_data = [
        (str(uuid.uuid4()), "Premium Essential Oils Set",
         "A curated collection of 6 therapeutic essential oils including lavender, eucalyptus, peppermint, tea tree, lemon, and frankincense. Perfect for aromatherapy and self-care.",
         42.00, "/images/product-oils.png", "Wellness", 1),
        (str(uuid.uuid4()), "Organic Protein Blend",
         "Plant-based protein powder made from pea, rice, and hemp proteins. 25g protein per serving. Vanilla flavour. No artificial additives.",
         38.00, "/images/product-protein.png", "Nutrition", 1),
        (str(uuid.uuid4()), "Premium Yoga Mat",
         "Non-slip, eco-friendly yoga mat with alignment markings. Extra thick 6mm cushioning for joint comfort. Comes with carrying strap.",
         55.00, "/images/product-yogamat.png", "Fitness", 1),
        (str(uuid.uuid4()), "Organic Herbal Tea Collection",
         "A selection of 5 premium herbal teas: chamomile calm, green detox, ginger immunity, rooibos energy, and hibiscus beauty. 20 bags each.",
         28.00, "/images/product-tea.png", "Nutrition", 1),
        (str(uuid.uuid4()), "Natural Skincare Set",
         "Complete organic skincare routine with cleanser, toner, serum, and moisturiser. Made with natural ingredients. Suitable for all skin types.",
         68.00, "/images/product-skincare.png", "Wellness", 1),
        (str(uuid.uuid4()), "Superfood Smoothie Bowl Mix",
         "Blend of acai, spirulina, maca, and mixed berries. Just add your favourite milk and toppings for a nutritious breakfast bowl. 15 servings.",
         32.00, "/images/product-smoothie.png", "Nutrition", 1),
    ]

    conn.executemany(
        "INSERT INTO products (id, name, description, price, image, category, in_stock) VALUES (?,?,?,?,?,?,?)",
        products_data
    )

    testimonials_data = [
        (str(uuid.uuid4()), "Tatenda Mhizha", "Fitness Client",
         "DMAC has completely transformed my approach to health. The personal training sessions are incredible, and I've lost 15kg in just 6 months. The team truly cares about your progress.", 5),
        (str(uuid.uuid4()), "Rumbidzai Choto", "Wellness Member",
         "The yoga and spa services are world-class. I come here every week for my meditation sessions and leave feeling completely refreshed. It's my sanctuary in Harare.", 5),
        (str(uuid.uuid4()), "Farai Dube", "Nutrition Client",
         "The nutritional counselling changed my life. My energy levels are through the roof and I feel healthier than ever. The team creates plans that actually work for real Zimbabwean diets.", 5),
    ]

    conn.executemany(
        "INSERT INTO testimonials (id, name, role, content, rating) VALUES (?,?,?,?,?)",
        testimonials_data
    )

    conn.commit()
    conn.close()
    print("Database seeded successfully!")


def row_to_dict(row):
    return dict(row)


# ============ API ROUTES ============

@app.route("/api/services", methods=["GET"])
def get_services():
    conn = get_db()
    rows = conn.execute("SELECT * FROM services").fetchall()
    conn.close()
    services = []
    for r in rows:
        d = row_to_dict(r)
        d["featured"] = bool(d["featured"])
        d["shortDescription"] = d.pop("short_description")
        services.append(d)
    return jsonify(services)


@app.route("/api/services/<service_id>", methods=["GET"])
def get_service(service_id):
    conn = get_db()
    row = conn.execute("SELECT * FROM services WHERE id = ?", (service_id,)).fetchone()
    conn.close()
    if not row:
        return jsonify({"message": "Service not found"}), 404
    d = row_to_dict(row)
    d["featured"] = bool(d["featured"])
    d["shortDescription"] = d.pop("short_description")
    return jsonify(d)


@app.route("/api/products", methods=["GET"])
def get_products():
    conn = get_db()
    rows = conn.execute("SELECT * FROM products").fetchall()
    conn.close()
    products = []
    for r in rows:
        d = row_to_dict(r)
        d["inStock"] = bool(d.pop("in_stock"))
        products.append(d)
    return jsonify(products)


@app.route("/api/products/<product_id>", methods=["GET"])
def get_product(product_id):
    conn = get_db()
    row = conn.execute("SELECT * FROM products WHERE id = ?", (product_id,)).fetchone()
    conn.close()
    if not row:
        return jsonify({"message": "Product not found"}), 404
    d = row_to_dict(row)
    d["inStock"] = bool(d.pop("in_stock"))
    return jsonify(d)


@app.route("/api/testimonials", methods=["GET"])
def get_testimonials():
    conn = get_db()
    rows = conn.execute("SELECT * FROM testimonials").fetchall()
    conn.close()
    return jsonify([row_to_dict(r) for r in rows])


@app.route("/api/orders/checkout", methods=["POST"])
def checkout():
    try:
        data = request.get_json()
        customer_name = data.get("customerName")
        customer_email = data.get("customerEmail")
        customer_phone = data.get("customerPhone")
        items = data.get("items", [])

        if not customer_name or not customer_email or not customer_phone or not items:
            return jsonify({"error": "Missing required fields"}), 400

        total_amount = sum(float(item["price"]) * int(item["quantity"]) for item in items)
        order_id = str(uuid.uuid4())

        conn = get_db()
        conn.execute(
            "INSERT INTO orders (id, customer_name, customer_email, customer_phone, total_amount, status) VALUES (?,?,?,?,?,?)",
            (order_id, customer_name, customer_email, customer_phone, total_amount, "pending")
        )

        for item in items:
            conn.execute(
                "INSERT INTO order_items (id, order_id, product_id, product_name, quantity, price) VALUES (?,?,?,?,?,?)",
                (str(uuid.uuid4()), order_id, item["productId"], item["productName"], item["quantity"], item["price"])
            )

        conn.commit()
        conn.close()

        integration_id = os.environ.get("PAYNOW_INTEGRATION_ID")
        integration_key = os.environ.get("PAYNOW_INTEGRATION_KEY")

        if not integration_id or not integration_key:
            conn = get_db()
            conn.execute("UPDATE orders SET status = ? WHERE id = ?", ("pending_payment", order_id))
            conn.commit()
            conn.close()
            return jsonify({
                "orderId": order_id,
                "error": "Payment gateway not configured. Please contact us via WhatsApp to complete your order."
            })

        try:
            from paynow import Paynow

            host = request.host_url.rstrip("/")
            result_url = f"{host}/api/orders/paynow-result"
            return_url = f"{host}/shop?order={order_id}"
            paynow = Paynow(integration_id, integration_key, return_url, result_url)

            payment = paynow.create_payment(f"Order-{order_id}", customer_email)

            for item in items:
                payment.add(item["productName"], float(item["price"]) * int(item["quantity"]))

            response = paynow.send(payment)

            if response.success:
                conn = get_db()
                conn.execute(
                    "UPDATE orders SET status = ?, poll_url = ?, paynow_reference = ? WHERE id = ?",
                    ("awaiting_payment", response.poll_url, response.poll_url, order_id)
                )
                conn.commit()
                conn.close()
                return jsonify({
                    "orderId": order_id,
                    "redirectUrl": response.redirect_url,
                    "pollUrl": response.poll_url,
                })
            else:
                conn = get_db()
                conn.execute("UPDATE orders SET status = ? WHERE id = ?", ("payment_failed", order_id))
                conn.commit()
                conn.close()
                return jsonify({
                    "orderId": order_id,
                    "error": response.error or "Payment initiation failed. Please try again.",
                })

        except Exception as e:
            print(f"Paynow error: {e}")
            conn = get_db()
            conn.execute("UPDATE orders SET status = ? WHERE id = ?", ("pending_payment", order_id))
            conn.commit()
            conn.close()
            return jsonify({
                "orderId": order_id,
                "error": "Payment gateway unavailable. Please contact us via WhatsApp to complete your order."
            })

    except Exception as e:
        print(f"Checkout error: {e}")
        return jsonify({"error": "Failed to process order"}), 500


@app.route("/api/orders/paynow-result", methods=["POST"])
def paynow_result():
    try:
        data = request.form if request.form else request.get_json() or {}
        poll_url = data.get("pollurl")
        status = data.get("status", "unknown")

        if poll_url:
            conn = get_db()
            order = conn.execute("SELECT id FROM orders WHERE poll_url = ?", (poll_url,)).fetchone()
            if order:
                new_status = "paid" if status.lower() == "paid" else status.lower()
                conn.execute("UPDATE orders SET status = ? WHERE id = ?", (new_status, order["id"]))
                conn.commit()
            conn.close()
        return "", 200
    except Exception as e:
        print(f"Paynow result error: {e}")
        return "", 500


@app.route("/api/orders/<order_id>/status", methods=["GET"])
def get_order_status(order_id):
    conn = get_db()
    order = conn.execute("SELECT * FROM orders WHERE id = ?", (order_id,)).fetchone()
    conn.close()
    if not order:
        return jsonify({"message": "Order not found"}), 404

    order_dict = row_to_dict(order)
    if order_dict.get("poll_url") and order_dict["status"] == "awaiting_payment":
        try:
            from paynow import Paynow
            host = request.host_url.rstrip("/")
            paynow = Paynow(
                os.environ.get("PAYNOW_INTEGRATION_ID", ""),
                os.environ.get("PAYNOW_INTEGRATION_KEY", ""),
                f"{host}/shop",
                f"{host}/api/orders/paynow-result"
            )
            status = paynow.check_transaction_status(order_dict["poll_url"])
            if status.paid:
                conn = get_db()
                conn.execute("UPDATE orders SET status = ? WHERE id = ?", ("paid", order_id))
                conn.commit()
                conn.close()
                order_dict["status"] = "paid"
        except Exception as e:
            print(f"Poll error: {e}")

    return jsonify({"status": order_dict["status"]})


# ============ STATIC FILE SERVING ============

DIST_DIR = os.path.join(os.path.dirname(__file__), "..", "client", "dist")
PUBLIC_DIR = os.path.join(os.path.dirname(__file__), "..", "client", "public")


@app.route("/images/<path:filename>")
def serve_images(filename):
    images_dist = os.path.join(DIST_DIR, "images")
    images_public = os.path.join(PUBLIC_DIR, "images")
    if os.path.exists(os.path.join(images_dist, filename)):
        return send_from_directory(images_dist, filename)
    elif os.path.exists(os.path.join(images_public, filename)):
        return send_from_directory(images_public, filename)
    return "Not found", 404


@app.route("/assets/<path:filename>")
def serve_assets(filename):
    assets_dir = os.path.join(DIST_DIR, "assets")
    return send_from_directory(assets_dir, filename)


@app.route("/favicon.png")
def serve_favicon():
    if os.path.exists(os.path.join(DIST_DIR, "favicon.png")):
        return send_from_directory(DIST_DIR, "favicon.png")
    return send_from_directory(PUBLIC_DIR, "favicon.png")


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_spa(path):
    if path.startswith("api/"):
        return jsonify({"message": "Not found"}), 404

    file_path = os.path.join(DIST_DIR, path)
    if path and os.path.exists(file_path) and os.path.isfile(file_path):
        return send_from_directory(DIST_DIR, path)

    index_path = os.path.join(DIST_DIR, "index.html")
    if os.path.exists(index_path):
        return send_file(index_path)

    return "Frontend not built. Run 'npm run build' first.", 404


# ============ STARTUP ============

init_db()
seed_db()

if __name__ == "__main__":
    port = int(os.environ.get("FLASK_PORT", os.environ.get("PORT", "5001")))
    app.run(host="0.0.0.0", port=port, debug=False)
