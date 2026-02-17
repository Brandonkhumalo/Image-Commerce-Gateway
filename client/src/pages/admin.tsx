import { useState, useRef, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Calendar, Clock, MapPin, Users, DollarSign, Plus, Pencil, Trash2, LogIn, LogOut, ImagePlus, X, Tag, Settings, Layout } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { Event, Service } from "@/types";

const EVENT_CATEGORIES = ["Corporate", "Social", "Academic", "Entertainment", "Community", "General"];

function LoginForm({ onLogin }: { onLogin: (token: string) => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (data.success) {
        onLogin(data.token);
      } else {
        setError("Invalid username or password. Please try again.");
      }
    } catch {
      setError("Connection error. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <Card className="p-8 w-full max-w-sm">
        <div className="text-center mb-6">
          <div className="w-14 h-14 mx-auto mb-3 rounded-md bg-primary/10 flex items-center justify-center">
            <LogIn className="w-7 h-7 text-primary" />
          </div>
          <h2 className="text-xl font-bold">Admin Login</h2>
          <p className="text-sm text-muted-foreground mt-1">Sign in to manage events</p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            data-testid="input-admin-username"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            data-testid="input-admin-password"
          />
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" disabled={loading || !username || !password} data-testid="button-admin-login">
            {loading ? "Logging in..." : "Log In"}
          </Button>
        </form>
      </Card>
    </div>
  );
}

interface EventFormData {
  title: string;
  description: string;
  venue: string;
  date: string;
  startTime: string;
  endTime: string;
  category: string;
  ticketPrice: number;
  capacity: number;
  images: string[];
}

const emptyForm: EventFormData = {
  title: "",
  description: "",
  venue: "DMAC Lifestyle Centre",
  date: "",
  startTime: "",
  endTime: "",
  category: "General",
  ticketPrice: 0,
  capacity: 0,
  images: [],
};

function EventForm({ initial, onSubmit, onCancel, loading }: {
  initial: EventFormData;
  onSubmit: (data: EventFormData) => void;
  onCancel: () => void;
  loading: boolean;
}) {
  const [form, setForm] = useState<EventFormData>(initial);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleImageAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const remaining = 5 - form.images.length;
    const toProcess = Array.from(files).slice(0, remaining);

    toProcess.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setForm((prev) => ({
          ...prev,
          images: [...prev.images, reader.result as string].slice(0, 5),
        }));
      };
      reader.readAsDataURL(file);
    });
    if (fileRef.current) fileRef.current.value = "";
  };

  const removeImage = (idx: number) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== idx),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="text-sm font-medium mb-1 block">Event Title</label>
        <Input
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="e.g. Annual Corporate Gala"
          required
          data-testid="input-event-title"
        />
      </div>
      <div>
        <label className="text-sm font-medium mb-1 block">Description</label>
        <Textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Describe the event..."
          required
          rows={3}
          data-testid="input-event-description"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-1 block">Venue</label>
          <Input
            value={form.venue}
            onChange={(e) => setForm({ ...form, venue: e.target.value })}
            required
            data-testid="input-event-venue"
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Category</label>
          <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
            <SelectTrigger data-testid="select-event-category">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {EVENT_CATEGORIES.map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="text-sm font-medium mb-1 block">Date</label>
          <Input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            required
            data-testid="input-event-date"
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Start Time</label>
          <Input
            type="time"
            value={form.startTime}
            onChange={(e) => setForm({ ...form, startTime: e.target.value })}
            required
            data-testid="input-event-start-time"
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">End Time</label>
          <Input
            type="time"
            value={form.endTime}
            onChange={(e) => setForm({ ...form, endTime: e.target.value })}
            required
            data-testid="input-event-end-time"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-1 block">Ticket Price (USD, 0 = Free)</label>
          <Input
            type="number"
            min="0"
            step="0.01"
            value={form.ticketPrice}
            onChange={(e) => setForm({ ...form, ticketPrice: parseFloat(e.target.value) || 0 })}
            data-testid="input-event-price"
          />
        </div>
        <div>
          <label className="text-sm font-medium mb-1 block">Capacity (0 = Unlimited)</label>
          <Input
            type="number"
            min="0"
            value={form.capacity}
            onChange={(e) => setForm({ ...form, capacity: parseInt(e.target.value) || 0 })}
            data-testid="input-event-capacity"
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium mb-2 block">Images (max 5)</label>
        <div className="flex flex-wrap gap-3 mb-3">
          {form.images.map((img, i) => (
            <div key={i} className="relative w-20 h-20 rounded-md overflow-hidden border">
              <img src={img} alt={`Upload ${i + 1}`} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-black/60 text-white flex items-center justify-center"
                data-testid={`button-remove-image-${i}`}
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
          {form.images.length < 5 && (
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="w-20 h-20 rounded-md border-2 border-dashed border-muted-foreground/30 flex flex-col items-center justify-center text-muted-foreground hover:border-primary/50 transition-colors"
              data-testid="button-add-image"
            >
              <ImagePlus className="w-5 h-5 mb-0.5" />
              <span className="text-[10px]">Add</span>
            </button>
          )}
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleImageAdd}
        />
      </div>

      <div className="flex items-center gap-3 justify-end pt-2">
        <Button type="button" variant="outline" onClick={onCancel} data-testid="button-cancel-event">Cancel</Button>
        <Button type="submit" disabled={loading} data-testid="button-save-event">
          {loading ? "Saving..." : "Save Event"}
        </Button>
      </div>
    </form>
  );
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function formatTime(time: string) {
  const [h, m] = time.split(":");
  const hour = parseInt(h);
  const ampm = hour >= 12 ? "PM" : "AM";
  const h12 = hour % 12 || 12;
  return `${h12}:${m} ${ampm}`;
}

function AssetManager({ token }: { token: string }) {
  const { toast } = useToast();
  const { data: assets, isLoading: assetsLoading } = useQuery<Record<string, any>>({
    queryKey: ["/api/assets"],
  });

  const { data: services, isLoading: servicesLoading } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  const updateAssetMutation = useMutation({
    mutationFn: async ({ key, value }: { key: string; value: any }) => {
      const res = await fetch("/api/admin/assets", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ key, value }),
      });
      if (!res.ok) throw new Error("Failed to update asset");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/assets"] });
      queryClient.invalidateQueries({ queryKey: ["/api/services"] });
      toast({ title: "Site asset updated successfully" });
    },
    onError: () => {
      toast({ title: "Failed to update asset", variant: "destructive" });
    },
  });

  const handleImageChange = (key: string, currentImages: string[], single = false) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.multiple = !single;
    input.onchange = (e: any) => {
      const files = e.target.files;
      if (!files) return;
      
      const newImages = single ? [] : [...currentImages];
      let loaded = 0;
      Array.from(files).forEach((file: any) => {
        const reader = new FileReader();
        reader.onload = () => {
          newImages.push(reader.result as string);
          loaded++;
          if (loaded === files.length) {
            updateAssetMutation.mutate({ key, value: single ? [newImages[0]] : newImages });
          }
        };
        reader.readAsDataURL(file);
      });
    };
    input.click();
  };

  const removeImage = (key: string, currentImages: string[], idx: number) => {
    const newImages = currentImages.filter((_, i) => i !== idx);
    updateAssetMutation.mutate({ key, value: newImages });
  };

  if (assetsLoading || servicesLoading) return <div className="p-8 text-center">Loading...</div>;

  const mainSections = [
    { key: "home_gallery", title: "Home Page Gallery", description: "Images for the main hero slider" },
    { key: "home_about", title: "Home Page About Image", description: "Image next to the about section" },
    { key: "home_footer", title: "Home Page Footer CTA", description: "Background for the 'Ready to Host' section" },
    { key: "services_header", title: "Services Page Header", description: "Header background image for services" },
    { key: "services_footer", title: "Services Page Footer", description: "Bottom banner image for services" },
    { key: "about_header", title: "About Us Header", description: "Background for the About page header" },
    { key: "vision_image", title: "About Us: Vision Image", description: "Image for the vision section" },
    { key: "sustainability_image", title: "About Us: Sustainability Image", description: "Image for the sustainability section" },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-4">
        <h2 className="text-xl font-bold">General Site Images</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mainSections.map((section) => (
            <Card key={section.key} className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-sm">{section.title}</h3>
                  <p className="text-xs text-muted-foreground">{section.description}</p>
                </div>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleImageChange(section.key, assets?.[section.key] || [], false)}
                  disabled={updateAssetMutation.isPending}
                >
                  <Plus className="w-3.5 h-3.5 mr-1.5" />
                  Add Image
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {(assets?.[section.key] || []).map((img: string, i: number) => (
                  <div key={i} className="relative w-20 h-20 rounded overflow-hidden border">
                    <img src={img} alt="" className="w-full h-full object-cover" />
                    <button
                      onClick={() => removeImage(section.key, assets?.[section.key], i)}
                      className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
                      title="Remove image"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                {(!assets?.[section.key] || assets[section.key].length === 0) && (
                  <div className="w-20 h-20 rounded bg-muted flex items-center justify-center border border-dashed">
                    <span className="text-[10px] text-muted-foreground text-center px-1">Using Default</span>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold">Service Category Images</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services?.map((service) => (
            <Card key={service.id} className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-sm">{service.name}</h3>
                  <Badge variant="secondary" className="text-[10px] mt-1">{service.category}</Badge>
                </div>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleImageChange(`service_img_${service.id}`, [], true)}
                  disabled={updateAssetMutation.isPending}
                >
                  <ImagePlus className="w-3.5 h-3.5 mr-1.5" />
                  Edit Image
                </Button>
              </div>
              <div className="relative h-32 w-full rounded overflow-hidden border">
                <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
                {assets?.[`service_img_${service.id}`] && (
                  <button
                    onClick={() => updateAssetMutation.mutate({ key: `service_img_${service.id}`, value: [] })}
                    className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 shadow-md"
                    title="Reset to default"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Admin() {
  const [token, setToken] = useState<string | null>(() => sessionStorage.getItem("adminToken"));
  const [activeTab, setActiveTab] = useState("events");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Event | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { toast } = useToast();

  const handleLogin = (t: string) => {
    setToken(t);
    sessionStorage.setItem("adminToken", t);
  };

  const handleLogout = () => {
    setToken(null);
    sessionStorage.removeItem("adminToken");
  };

  const { data: events, isLoading } = useQuery<Event[]>({
    queryKey: ["/api/events"],
    enabled: !!token && activeTab === "events",
  });

  const createMutation = useMutation({
    mutationFn: async (data: EventFormData) => {
      const res = await fetch("/api/admin/events", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to create event");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/events"] });
      setDialogOpen(false);
      toast({ title: "Event created successfully" });
    },
    onError: () => {
      toast({ title: "Failed to create event", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: EventFormData }) => {
      const res = await fetch(`/api/admin/events/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to update event");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/events"] });
      setDialogOpen(false);
      setEditing(null);
      toast({ title: "Event updated successfully" });
    },
    onError: () => {
      toast({ title: "Failed to update event", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/admin/events/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete event");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/events"] });
      setDeleteId(null);
      toast({ title: "Event deleted successfully" });
    },
    onError: () => {
      toast({ title: "Failed to delete event", variant: "destructive" });
    },
  });

  if (!token) {
    return <LoginForm onLogin={handleLogin} />;
  }

  const openCreate = () => {
    setEditing(null);
    setDialogOpen(true);
  };

  const openEdit = (event: Event) => {
    setEditing(event);
    setDialogOpen(true);
  };

  const handleFormSubmit = (data: EventFormData) => {
    if (editing) {
      updateMutation.mutate({ id: editing.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  return (
    <div className="py-8 sm:py-12 bg-background min-h-[70vh]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground text-sm mt-1">Manage your website content and events</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={handleLogout} data-testid="button-admin-logout">
              <LogOut className="w-4 h-4 mr-2" />
              Log Out
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="events" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Events
            </TabsTrigger>
            <TabsTrigger value="assets" className="flex items-center gap-2">
              <Layout className="w-4 h-4" />
              Site Images
            </TabsTrigger>
          </TabsList>

          <TabsContent value="events" className="space-y-6">
            <div className="flex justify-end">
              <Button onClick={openCreate} data-testid="button-add-event">
                <Plus className="w-4 h-4 mr-2" />
                Add Event
              </Button>
            </div>

            {isLoading ? (
              <div className="flex flex-col gap-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Card key={i} className="p-5">
                    <div className="flex gap-4">
                      <div className="w-24 h-24 rounded-md bg-muted animate-pulse shrink-0" />
                      <div className="flex-1 space-y-2">
                        <div className="h-5 w-1/3 bg-muted animate-pulse rounded" />
                        <div className="h-4 w-2/3 bg-muted animate-pulse rounded" />
                        <div className="h-4 w-1/4 bg-muted animate-pulse rounded" />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : events && events.length > 0 ? (
              <div className="flex flex-col gap-4">
                {events.map((event) => (
                  <Card key={event.id} className="p-5" data-testid={`card-admin-event-${event.id}`}>
                    <div className="flex gap-4 flex-col sm:flex-row">
                      {event.images.length > 0 ? (
                        <img src={event.images[0]} alt={event.title} className="w-full sm:w-28 h-28 rounded-md object-cover shrink-0" />
                      ) : (
                        <div className="w-full sm:w-28 h-28 rounded-md bg-muted flex items-center justify-center shrink-0">
                          <Calendar className="w-8 h-8 text-muted-foreground/40" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1 flex-wrap">
                          <h3 className="font-semibold text-base">{event.title}</h3>
                          <Badge variant="secondary" className="text-xs shrink-0">
                            <Tag className="w-3 h-3 mr-1" />
                            {event.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{event.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
                          <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{formatDate(event.date)}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{formatTime(event.startTime)} - {formatTime(event.endTime)}</span>
                          <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{event.venue}</span>
                          {event.ticketPrice > 0 && <span className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5" />${event.ticketPrice}</span>}
                          {event.capacity > 0 && <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{event.capacity}</span>}
                          {event.images.length > 0 && <span className="flex items-center gap-1"><ImagePlus className="w-3.5 h-3.5" />{event.images.length} image{event.images.length > 1 ? "s" : ""}</span>}
                        </div>
                      </div>
                      <div className="flex sm:flex-col gap-2 shrink-0">
                        <Button size="icon" variant="outline" onClick={() => openEdit(event)} data-testid={`button-edit-event-${event.id}`}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button size="icon" variant="outline" onClick={() => setDeleteId(event.id)} data-testid={`button-delete-event-${event.id}`}>
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <Calendar className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Events Yet</h3>
                <p className="text-muted-foreground mb-6">Create your first event to get started.</p>
                <Button onClick={openCreate} data-testid="button-add-event-empty">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Event
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="assets">
            <AssetManager token={token} />
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={dialogOpen} onOpenChange={(open) => { if (!open) { setDialogOpen(false); setEditing(null); } }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Event" : "Add New Event"}</DialogTitle>
          </DialogHeader>
          <EventForm
            initial={editing ? {
              title: editing.title,
              description: editing.description,
              venue: editing.venue,
              date: editing.date,
              startTime: editing.startTime,
              endTime: editing.endTime,
              category: editing.category,
              ticketPrice: editing.ticketPrice,
              capacity: editing.capacity,
              images: editing.images,
            } : emptyForm}
            onSubmit={handleFormSubmit}
            onCancel={() => { setDialogOpen(false); setEditing(null); }}
            loading={createMutation.isPending || updateMutation.isPending}
          />
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteId} onOpenChange={(open) => { if (!open) setDeleteId(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Event</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this event? This action cannot be undone. All associated images will also be removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="button-cancel-delete">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && deleteMutation.mutate(deleteId)}
              data-testid="button-confirm-delete"
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
