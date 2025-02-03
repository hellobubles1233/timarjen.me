import React, { useState } from "react";
import { Section } from "../ui/Section";
import { Grid } from "../ui/Grid";
import { Card, CardTitle, CardDescription } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { Stats } from "../ui/Stats";
import { Tabs } from "../ui/Tabs";
import { Laptop, Coffee, Code, PenTool as Tool, Star, TrendingUp, Search } from "lucide-react";
import { useSupabaseQuery } from "../hooks/useSupabaseQuery";
import { Product } from "../types/database";
import { Skeleton } from "../ui/Skeleton";
import { Alert } from "../ui/Alert";
import { Progress } from "../ui/Progress";
import { Button } from "../ui/Button";

function ProductOverview({ products }: { products: Product[] }) {
  const stats = {
    totalDevices: products?.filter((p) => p.type === "devices").length || 0,
    totalLifestyle: products?.filter((p) => p.type === "lifestyle").length || 0,
    totalSoftware: products?.filter((p) => p.type === "software").length || 0,
    totalTinkering: products?.filter((p) => p.type === "tinkering").length || 0,
    averageRating: products?.reduce((acc, item) => acc + item.rating, 0) / (products?.length || 1) || 0,
  };

  const recentItems = [...(products || [])]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5);

  const topRated = [...(products || [])]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  const typeDistribution = {
    devices: (stats.totalDevices / products.length) * 100,
    lifestyle: (stats.totalLifestyle / products.length) * 100,
    software: (stats.totalSoftware / products.length) * 100,
    tinkering: (stats.totalTinkering / products.length) * 100,
  };

  return (
    <div className="space-y-8">
      <Stats
        items={[
          { label: "Devices", value: stats.totalDevices },
          { label: "Lifestyle", value: stats.totalLifestyle },
          { label: "Software", value: stats.totalSoftware },
          { label: "Tinkering", value: stats.totalTinkering },
          { label: "Average Rating", value: `${stats.averageRating.toFixed(1)}/5` },
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-6">
          <CardTitle className="mb-4">Distribution by Type</CardTitle>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Devices</span>
                <span className="text-sm">{typeDistribution.devices.toFixed(1)}%</span>
              </div>
              <Progress value={typeDistribution.devices} variant="default" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Lifestyle</span>
                <span className="text-sm">{typeDistribution.lifestyle.toFixed(1)}%</span>
              </div>
              <Progress value={typeDistribution.lifestyle} variant="default" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Software</span>
                <span className="text-sm">{typeDistribution.software.toFixed(1)}%</span>
              </div>
              <Progress value={typeDistribution.software} variant="default" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Tinkering</span>
                <span className="text-sm">{typeDistribution.tinkering.toFixed(1)}%</span>
              </div>
              <Progress value={typeDistribution.tinkering} variant="default" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <CardTitle className="mb-4">Recently Added</CardTitle>
          <div className="space-y-4">
            {recentItems.map((item) => (
              <div key={item.uuid} className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{item.title}</div>
                  <div className="text-sm text-gray-500">{item.type}</div>
                </div>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < item.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <CardTitle className="mb-4">Top Rated</CardTitle>
          <div className="space-y-4">
            {topRated.map((item) => (
              <div key={item.uuid} className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{item.title}</div>
                  <div className="text-sm text-gray-500">{item.type}</div>
                </div>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < item.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function ProductCard({ item }: { item: Product }) {
  const categoryIcons = {
    devices: Laptop,
    lifestyle: Coffee,
    software: Code,
    tinkering: Tool,
  };
  const Icon = categoryIcons[item.type as keyof typeof categoryIcons];

  return (
    <Card className="overflow-hidden group">
      <div className="aspect-video overflow-hidden rounded-lg mb-4 relative">
        <img
          draggable="false"
          src={item.img_url || "https://via.placeholder.com/800x400"}
          alt={item.title}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Icon className="w-12 h-12 text-white" />
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Badge variant="gray">{item.type}</Badge>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < item.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
        <div>
          <CardTitle>{item.title}</CardTitle>
          <div className="text-sm text-notion-gray-dark mt-1">
            Added: {new Date(item.created_at).toLocaleDateString()}
          </div>
        </div>
        <CardDescription>{item.description}</CardDescription>
      </div>
    </Card>
  );
}

export function Products() {
  const [activeTab, setActiveTab] = useState<"overview" | "all" | "devices" | "lifestyle" | "software" | "tinkering">("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const { data: products, loading, error } = useSupabaseQuery<Product>("products", {
    orderBy: { column: "created_at", ascending: false },
  });

  const tabs = [
    { 
      id: "overview", 
      label: (
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-4 h-4" />
          <span>Overview</span>
        </div>
      )
    },
    {
      id: "all",
      label: "All Products"
    },
    { 
      id: "devices", 
      label: (
        <div className="flex items-center space-x-2">
          <Laptop className="w-4 h-4" />
          <span>Devices</span>
        </div>
      )
    },
    { 
      id: "lifestyle", 
      label: (
        <div className="flex items-center space-x-2">
          <Coffee className="w-4 h-4" />
          <span>Lifestyle</span>
        </div>
      )
    },
    { 
      id: "software", 
      label: (
        <div className="flex items-center space-x-2">
          <Code className="w-4 h-4" />
          <span>Software</span>
        </div>
      )
    },
    { 
      id: "tinkering", 
      label: (
        <div className="flex items-center space-x-2">
          <Tool className="w-4 h-4" />
          <span>Tinkering</span>
        </div>
      )
    },
  ];

  const filteredProducts = products?.filter((item) => {
    const matchesTab = activeTab === "overview" || activeTab === "all" || item.type === activeTab;
    const matchesSearch = searchTerm === "" || 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesTab && matchesSearch;
  }) || [];

  if (error) {
    return (
      <div className="notion-page pt-32">
        <Section title="Error" subtitle="Failed to load products data">
          <Alert variant="error">{error.message}</Alert>
        </Section>
      </div>
    );
  }

  return (
    <div className="notion-page pt-32">
      <Section
        title="My Product Collection"
        subtitle="A curated list of products I use and recommend"
      >
        <div className="space-y-8">
          <Tabs
            tabs={tabs.map((tab) => ({
              id: tab.id,
              label: tab.label,
              content: null,
            }))}
            activeTab={activeTab}
            onChange={(id) => setActiveTab(id as typeof activeTab)}
          />

          {activeTab !== "overview" && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search by title, description, or type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
              />
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  onClick={() => setSearchTerm("")}
                >
                  Clear
                </Button>
              )}
            </div>
          )}

          {activeTab === "overview" ? (
            loading ? (
              <div className="space-y-8">
                <Skeleton className="h-32" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <Skeleton className="h-64" />
                  <Skeleton className="h-64" />
                </div>
              </div>
            ) : (
              <ProductOverview products={products || []} />
            )
          ) : (
            <>
              {searchTerm && (
                <div className="text-sm text-gray-500">
                  Found {filteredProducts.length} results for "{searchTerm}"
                </div>
              )}
              <Grid cols={3} gap="lg">
                {loading ? (
                  Array.from({ length: 6 }).map((_, i) => (
                    <Card key={i} className="space-y-4">
                      <Skeleton className="aspect-video rounded-lg" />
                      <Skeleton className="h-4 w-1/4" />
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                    </Card>
                  ))
                ) : (
                  filteredProducts.map((item) => <ProductCard key={item.uuid} item={item} />)
                )}
              </Grid>
            </>
          )}
        </div>
      </Section>
    </div>
  );
}