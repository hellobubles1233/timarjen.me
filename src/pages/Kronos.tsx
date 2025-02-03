import React, { useState, useEffect } from "react";
import { Section } from "../ui/Section";
import { Card, CardTitle } from "../ui/Card";
import { Button } from "../ui/Button";
import { Tabs } from "../ui/Tabs";
import { Alert } from "../ui/Alert";
import { supabase } from "../lib/supabase";
import { Lock, Save, Upload, RefreshCw, Plus, Trash2, Edit2, X, Search, ArrowUpDown, Star, Film, Tv, Book } from "lucide-react";
import { Project, Experience, Media, Product } from "../types/database";
import { cn } from "../utils/cn";
import { Tag } from "../ui/Tag";
import { MarkdownEditor } from "../ui/MarkdownEditor";

interface FormState {
  mode: "view" | "create" | "edit";
  selectedItem: any | null;
}

// Project Form Component
function ProjectForm({ onSubmit, initialData }: { onSubmit: (data: any) => void; initialData?: any }) {
  const [formData, setFormData] = useState({
    title: "",
    status: "planned",
    lead: "",
    tags: [],
    content: {
      description: "",
      markdown: "",
      imageUrl: "",
    },
    ...initialData
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Status</label>
        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          className="w-full p-2 border rounded"
        >
          <option value="planned">Planned</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Lead</label>
        <input
          type="text"
          value={formData.lead}
          onChange={(e) => setFormData({ ...formData, lead: e.target.value })}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Tags (comma-separated)</label>
        <input
          type="text"
          value={formData.tags.join(", ")}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(",").map(t => t.trim()) })}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Image URL</label>
        <input
          type="url"
          value={formData.content.imageUrl}
          onChange={(e) => setFormData({
            ...formData,
            content: { ...formData.content, imageUrl: e.target.value }
          })}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Content</label>
        <MarkdownEditor
          value={formData.content.markdown || formData.content.description}
          onChange={(value) => setFormData({
            ...formData,
            content: {
              ...formData.content,
              description: value.substring(0, 200) + (value.length > 200 ? '...' : ''),
              markdown: value
            }
          })}
        />
      </div>
      <Button type="submit">Save Project</Button>
    </form>
  );
}

// Experience Form Component
function ExperienceForm({ onSubmit, initialData }: { onSubmit: (data: any) => void; initialData?: any }) {
  const [formData, setFormData] = useState({
    company: "",
    jobtitle: "",
    type: "full-time",
    tags: [],
    content: {
      description: "",
      responsibilities: [],
      achievements: []
    },
    ...initialData
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Company</label>
        <input
          type="text"
          value={formData.company}
          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Job Title</label>
        <input
          type="text"
          value={formData.jobtitle}
          onChange={(e) => setFormData({ ...formData, jobtitle: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Type</label>
        <select
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          className="w-full p-2 border rounded"
        >
          <option value="full-time">Full Time</option>
          <option value="part-time">Part Time</option>
          <option value="contract">Contract</option>
          <option value="freelance">Freelance</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Tags (comma-separated)</label>
        <input
          type="text"
          value={formData.tags.join(", ")}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(",").map(t => t.trim()) })}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          value={formData.content.description}
          onChange={(e) => setFormData({ 
            ...formData, 
            content: { ...formData.content, description: e.target.value }
          })}
          className="w-full p-2 border rounded"
          rows={4}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Responsibilities (one per line)</label>
        <textarea
          value={formData.content.responsibilities.join("\n")}
          onChange={(e) => setFormData({ 
            ...formData, 
            content: { ...formData.content, responsibilities: e.target.value.split("\n") }
          })}
          className="w-full p-2 border rounded"
          rows={4}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Achievements (one per line)</label>
        <textarea
          value={formData.content.achievements.join("\n")}
          onChange={(e) => setFormData({ 
            ...formData, 
            content: { ...formData.content, achievements: e.target.value.split("\n") }
          })}
          className="w-full p-2 border rounded"
          rows={4}
        />
      </div>
      <Button type="submit">Save Experience</Button>
    </form>
  );
}

// Media Form Component
function MediaForm({ onSubmit, initialData }: { onSubmit: (data: any) => void; initialData?: any }) {
  const [formData, setFormData] = useState({
    title: "",
    type: "movie",
    madeby: "",
    release: new Date().getFullYear(),
    comment: "",
    reconsumed: 0,
    rating: 5,
    ...initialData
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Type</label>
        <select
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          className="w-full p-2 border rounded"
        >
          <option value="movie">Movie</option>
          <option value="tv">TV Show</option>
          <option value="book">Book</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Made By</label>
        <input
          type="text"
          value={formData.madeby}
          onChange={(e) => setFormData({ ...formData, madeby: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Release Year</label>
        <input
          type="number"
          value={formData.release}
          onChange={(e) => setFormData({ ...formData, release: parseInt(e.target.value) })}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Comment</label>
        <textarea
          value={formData.comment}
          onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
          className="w-full p-2 border rounded"
          rows={4}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Times Consumed</label>
        <input
          type="number"
          value={formData.reconsumed}
          onChange={(e) => setFormData({ ...formData, reconsumed: parseInt(e.target.value) })}
          className="w-full p-2 border rounded"
          min="0"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Rating (1-5)</label>
        <input
          type="number"
          value={formData.rating}
          onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
          className="w-full p-2 border rounded"
          min="1"
          max="5"
          required
        />
      </div>
      <Button type="submit">Save Media</Button>
    </form>
  );
}

// Product Form Component
function ProductForm({ onSubmit, initialData }: { onSubmit: (data: any) => void; initialData?: any }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    rating: 5,
    img_url: "",
    type: "devices",
    ...initialData
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full p-2 border rounded"
          rows={4}
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Type</label>
        <select
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          className="w-full p-2 border rounded"
        >
          <option value="devices">Devices</option>
          <option value="lifestyle">Lifestyle</option>
          <option value="software">Software</option>
          <option value="tinkering">Tinkering</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Image URL</label>
        <input
          type="url"
          value={formData.img_url}
          onChange={(e) => setFormData({ ...formData, img_url: e.target.value })}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Rating (1-5)</label>
        <input
          type="number"
          value={formData.rating}
          onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
          className="w-full p-2 border rounded"
          min="1"
          max="5"
          required
        />
      </div>
      <Button type="submit">Save Product</Button>
    </form>
  );
}

function TableManager({ table, Form }: { table: string; Form: any }) {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formState, setFormState] = useState<FormState>({ mode: "view", selectedItem: null });
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  }>({ key: 'created_at', direction: 'desc' });

  useEffect(() => {
    fetchItems();
  }, [table]);

  async function fetchItems() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .order(sortConfig.key, { ascending: sortConfig.direction === 'asc' });

      if (error) throw error;
      setItems(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const handleSort = (key: string) => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const filteredItems = items.filter(item => {
    const searchFields = ['title', 'jobtitle', 'company', 'description', 'type', 'madeby'].filter(field => item[field]);
    return searchFields.some(field => 
      item[field].toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  async function handleSubmit(data: any) {
    try {
      if (formState.mode === "edit" && formState.selectedItem) {
        const { error } = await supabase
          .from(table)
          .update(data)
          .eq('uuid', formState.selectedItem.uuid);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from(table)
          .insert([data]);

        if (error) throw error;
      }

      await fetchItems();
      setFormState({ mode: "view", selectedItem: null });
    } catch (err: any) {
      setError(err.message);
    }
  }

  async function handleDelete(uuid: string) {
    if (!confirm("Are you sure you want to delete this item?")) return;

    try {
      const { error } = await supabase
        .from(table)
        .delete()
        .eq('uuid', uuid);

      if (error) throw error;
      await fetchItems();
    } catch (err: any) {
      setError(err.message);
    }
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <Alert variant="error">{error}</Alert>;

  const getSortableFields = () => {
    switch (table) {
      case 'projects':
        return [
          { key: 'title', label: 'Title' },
          { key: 'status', label: 'Status' },
          { key: 'created_at', label: 'Created' }
        ];
      case 'experience':
        return [
          { key: 'company', label: 'Company' },
          { key: 'jobtitle', label: 'Job Title' },
          { key: 'created_at', label: 'Start Date' }
        ];
      case 'media':
        return [
          { key: 'title', label: 'Title' },
          { key: 'type', label: 'Type' },
          { key: 'rating', label: 'Rating' },
          { key: 'created_at', label: 'Added' }
        ];
      case 'products':
        return [
          { key: 'title', label: 'Title' },
          { key: 'type', label: 'Type' },
          { key: 'rating', label: 'Rating' },
          { key: 'created_at', label: 'Added' }
        ];
      default:
        return [];
    }
  };

  return (
    <div className="space-y-6">
      {formState.mode === "view" ? (
        <>
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Button onClick={() => fetchItems()}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border rounded-md w-64"
                  />
                </div>
              </div>
              <Button onClick={() => setFormState({ mode: "create", selectedItem: null })}>
                <Plus className="w-4 h-4 mr-2" />
                Add New
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {getSortableFields().map(field => (
                <Button
                  key={field.key}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSort(field.key)}
                  className={cn(
                    "flex items-center",
                    sortConfig.key === field.key && "bg-gray-100"
                  )}
                >
                  {field.label}
                  <ArrowUpDown className="w-3 h-3 ml-1" />
                </Button>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            {sortedItems.map((item) => (
              <Card key={item.uuid} className="p-4">
                <div className="flex items-start space-x-4">
                  {/* Show images only for projects and products */}
                  {(table === 'projects' || table === 'products') && item.content?.imageUrl && (
                    <div className="w-24 h-24 flex-shrink-0">
                      <img
                        src={table === 'projects' ? item.content.imageUrl : item.img_url}
                        alt={item.title}
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                  )}
                  <div className="flex-grow">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle>
                          {table === 'experience' ? item.jobtitle : item.title}
                        </CardTitle>
                        <div className="text-sm text-gray-500 space-y-1">
                          {/* Experience specific fields */}
                          {table === 'experience' && (
                            <>
                              <div>at {item.company}</div>
                              <div>{item.type}</div>
                            </>
                          )}
                          
                          {/* Project specific fields */}
                          {table === 'projects' && (
                            <>
                              <div>Status: {item.status}</div>
                              {item.lead && <div>Lead: {item.lead}</div>}
                            </>
                          )}
                          
                          {/* Media specific fields */}
                          {table === 'media' && (
                            <>
                              <div>{item.type} by {item.madeby}</div>
                              <div>Released: {item.release}</div>
                              <div>Times consumed: {item.reconsumed}</div>
                            </>
                          )}
                          
                          {/* Product specific fields */}
                          {table === 'products' && (
                            <>
                              <div>{item.type}</div>
                              <div className="line-clamp-2">{item.description}</div>
                            </>
                          )}
                          
                          {/* Show rating for media and products */}
                          {(table === 'media' || table === 'products') && (
                            <div className="flex items-center">
                              Rating: {item.rating}/5
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={cn(
                                    "w-4 h-4 ml-1",
                                    i < item.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                  )}
                                />
                              ))}
                            </div>
                          )}
                          
                          {/* Show tags for projects and experience */}
                          {(table === 'projects' || table === 'experience') && item.tags && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {item.tags.map((tag: string) => (
                                <Tag key={tag} variant="default">
                                  {tag}
                                </Tag>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setFormState({ mode: "edit", selectedItem: item })}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(item.uuid)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </>
      ) : (
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium">
              {formState.mode === "create" ? "Add New" : "Edit"} {table}
            </h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setFormState({ mode: "view", selectedItem: null })}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <Form onSubmit={handleSubmit} initialData={formState.selectedItem} />
        </Card>
      )}
    </div>
  );
}

export function Kronos() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("projects");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "FrodoGan18") {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: 'admin@timarjen.me',
          password: password
        });

        if (error) throw error;
        setAuthenticated(true);
        setError("");
      } catch (err: any) {
        setError(err.message);
      }
    } else {
      setError("Invalid password");
    }
  };

  if (!authenticated) {
    return (
      <div className="notion-page pt-32">
        <Section>
          <div className="max-w-md mx-auto">
            <Card className="p-6">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="flex justify-center mb-6">
                  <Lock className="w-12 h-12 text-gray-400" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full p-2 border rounded"
                />
                {error && <Alert variant="error">{error}</Alert>}
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </form>
            </Card>
          </div>
        </Section>
      </div>
    );
  }

  const tabs = [
    { id: "projects", label: "Projects", component: ProjectForm },
    { id: "experience", label: "Experience", component: ExperienceForm },
    { id: "media", label: "Media", component: MediaForm },
    { id: "products", label: "Products", component: ProductForm },
  ];

  return (
    <div className="notion-page pt-32">
      <Section title="Content Management">
        <Tabs
          tabs={tabs.map(tab => ({
            id: tab.id,
            label: tab.label,
            content: <TableManager table={tab.id} Form={tab.component} />,
          }))}
          activeTab={activeTab}
          onChange={setActiveTab}
        />
      </Section>
    </div>
  );
}