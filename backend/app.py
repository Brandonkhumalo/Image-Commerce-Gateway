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
        (str(uuid.uuid4()), "Corporate Functions",
         "DMAC Lifestyle Centre is pushing to be the best in offering corporate functions in Zimbabwe. With our global experience, we help ensure corporate functions are done in an environment and setup comparable to any other place in the world. We have 7 beautiful function halls of different capacities ranging from 50 to 1000 people seated on tables.",
         "World-class corporate event hosting with 7 function halls seating up to 1000 guests.",
         0, "Customised", "/images/service-corporate.png", "Corporate", 1),
        (str(uuid.uuid4()), "Conferencing Facilities",
         "DMAC offers second to none conferencing facilities with state of the art conference equipment and accessories which meet global standards. Our halls can accommodate from intimate boardroom meetings to large-scale conferences with up to 2000 guests in cinema setup.",
         "State-of-the-art conference equipment meeting global standards.",
         0, "Customised", "/images/service-conference.png", "Corporate", 1),
        (str(uuid.uuid4()), "Academic Functions",
         "DMAC Lifestyle Centre offers a wide range of academic functions from graduations, prefect trainings, inductions, team building activities, leavers parties and anything related to the field of academics. We provide the perfect setting to celebrate educational milestones.",
         "Graduations, trainings, inductions, and academic celebrations.",
         0, "Customised", "/images/service-academic.png", "Academic", 1),
        (str(uuid.uuid4()), "Social Functions",
         "We offer a range of social functions including weddings, marooro functions, picnics, engagements, birthday parties and any other social celebrations. Our packages range from Silver, Gold and Platinum to suit every budget and occasion.",
         "Weddings, engagements, birthdays, and social celebrations with Silver, Gold & Platinum packages.",
         0, "Customised", "/images/service-social.png", "Social", 1),
        (str(uuid.uuid4()), "Team Building Activities",
         "DMAC provides comprehensive team building activities for all corporates. Our experienced facilitators design engaging programmes that foster teamwork, communication, and leadership skills in a beautiful outdoor and indoor setting.",
         "Professional team building programmes for corporates.",
         0, "Customised", "/images/service-teambuilding.png", "Corporate", 0),
        (str(uuid.uuid4()), "Restaurant & Dining",
         "Our restaurant offers a variety of food offerings from traditional Zimbabwean cuisine to international dishes. Whether it is a formal dinner, buffet, or cocktail event, our culinary team delivers exceptional dining experiences.",
         "Diverse cuisine from traditional Zimbabwean to international dishes.",
         0, "Customised", "/images/service-restaurant.png", "Hospitality", 0),
        (str(uuid.uuid4()), "Accommodation",
         "DMAC provides comfortable and well-appointed accommodation for guests attending events or visiting Harare. Our rooms are designed with modern amenities to ensure a pleasant stay during your time with us.",
         "Comfortable, modern accommodation for event guests and visitors.",
         0, "Customised", "/images/service-accommodation.png", "Hospitality", 0),
    ]

    conn.executemany(
        "INSERT INTO services (id, name, description, short_description, price, duration, image, category, featured) VALUES (?,?,?,?,?,?,?,?,?)",
        services_data
    )

    products_data = [
        (str(uuid.uuid4()), "Silver Wedding Package",
         "Our Silver package includes venue hire for one function hall (up to 100 guests), basic decor and table setup, sound system, and a standard buffet menu. Perfect for intimate celebrations.",
         1500.00, "/images/service-social.png", "Wedding Packages", 1),
        (str(uuid.uuid4()), "Gold Wedding Package",
         "Our Gold package includes venue hire for a larger function hall (up to 300 guests), premium decor with floral arrangements, professional sound and lighting, a premium buffet menu, and a complimentary cocktail hour.",
         3500.00, "/images/service-social.png", "Wedding Packages", 1),
        (str(uuid.uuid4()), "Platinum Wedding Package",
         "Our Platinum package is the ultimate wedding experience with our largest hall (up to 1000 guests), luxury decor and floral design, full AV setup, a gourmet plated dinner, open bar, accommodation for the bridal party, and dedicated event coordinator.",
         7500.00, "/images/service-social.png", "Wedding Packages", 1),
        (str(uuid.uuid4()), "Corporate Conference Package",
         "Full-day conference package including venue hire, state-of-the-art AV equipment, projector and screen, high-speed WiFi, tea/coffee breaks, and a business lunch. Capacity up to 500 delegates.",
         2000.00, "/images/service-conference.png", "Corporate Packages", 1),
        (str(uuid.uuid4()), "Team Building Package",
         "Complete team building experience including venue, professional facilitators, indoor and outdoor activities, all equipment, lunch, and refreshments. Customised programmes for groups of 20 to 200 people.",
         1200.00, "/images/service-teambuilding.png", "Corporate Packages", 1),
        (str(uuid.uuid4()), "Graduation Celebration Package",
         "Celebrate your academic achievement with our graduation package. Includes venue hire, stage setup, sound system, photography area, and a celebratory buffet for up to 200 guests.",
         1800.00, "/images/service-academic.png", "Academic Packages", 1),
    ]

    conn.executemany(
        "INSERT INTO products (id, name, description, price, image, category, in_stock) VALUES (?,?,?,?,?,?,?)",
        products_data
    )

    testimonials_data = [
        (str(uuid.uuid4()), "Tendai Moyo", "Corporate Client",
         "DMAC hosted our annual company conference and the experience was world-class. The venue was stunning, the AV equipment flawless, and the catering was exceptional. Our delegates were thoroughly impressed.", 5),
        (str(uuid.uuid4()), "Rumbidzai Choto", "Wedding Client",
         "Our wedding at DMAC was a dream come true. The Gold package exceeded all our expectations. The decor was breathtaking and the team handled every detail with professionalism. We could not have asked for a better venue.", 5),
        (str(uuid.uuid4()), "Professor Farai Dube", "Academic Client",
         "We have hosted multiple graduation ceremonies at DMAC and each time the experience has been outstanding. The function halls are spacious, well-equipped, and the staff are incredibly accommodating. Highly recommended for academic events.", 5),
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
            return_url = f"{host}/packages?order={order_id}"
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
                f"{host}/packages",
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
