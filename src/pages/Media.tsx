import React, { useState } from "react";
import { Section } from "../ui/Section";
import { Grid } from "../ui/Grid";
import { Card, CardTitle, CardDescription } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { Stats } from "../ui/Stats";
import { Tabs } from "../ui/Tabs";
import { Film, Tv, Book, Star, TrendingUp, Search } from "lucide-react";
import { useSupabaseQuery } from "../hooks/useSupabaseQuery";
import { Media as MediaType } from "../types/database";
import { Skeleton } from "../ui/Skeleton";
import { Alert } from "../ui/Alert";
import { Progress } from "../ui/Progress";
import { Button } from "../ui/Button";

function MediaOverview({ mediaItems }: { mediaItems: MediaType[] }) {
  const stats = {
    totalMovies: mediaItems?.filter((item) => item.type === "movie").length || 0,
    totalTvShows: mediaItems?.filter((item) => item.type === "tv").length || 0,
    totalBooks: mediaItems?.filter((item) => item.type === "book").length || 0,
    averageRating: mediaItems?.reduce((acc, item) => acc + item.rating, 0) / (mediaItems?.length || 1) || 0,
    totalWatched: mediaItems?.reduce((acc, item) => acc + (item.type !== "book" ? item.reconsumed || 0 : 0), 0) || 0,
    totalRead: mediaItems?.reduce((acc, item) => acc + (item.type === "book" ? item.reconsumed || 0 : 0), 0) || 0,
  };

  const recentItems = [...(mediaItems || [])]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5);

  const topRated = [...(mediaItems || [])]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  const typeDistribution = {
    movies: (stats.totalMovies / mediaItems.length) * 100,
    tvShows: (stats.totalTvShows / mediaItems.length) * 100,
    books: (stats.totalBooks / mediaItems.length) * 100,
  };

  return (
    <div className="space-y-8">
      <Stats
        items={[
          { label: "Movies", value: stats.totalMovies },
          { label: "TV Shows", value: stats.totalTvShows },
          { label: "Books", value: stats.totalBooks },
          { label: "Average Rating", value: `${stats.averageRating.toFixed(1)}/5` },
          { label: "Total Watched", value: stats.totalWatched },
          { label: "Total Read", value: stats.totalRead },
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-6">
          <CardTitle className="mb-4">Distribution by Type</CardTitle>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Movies</span>
                <span className="text-sm">{typeDistribution.movies.toFixed(1)}%</span>
              </div>
              <Progress value={typeDistribution.movies} variant="default" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">TV Shows</span>
                <span className="text-sm">{typeDistribution.tvShows.toFixed(1)}%</span>
              </div>
              <Progress value={typeDistribution.tvShows} variant="default" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Books</span>
                <span className="text-sm">{typeDistribution.books.toFixed(1)}%</span>
              </div>
              <Progress value={typeDistribution.books} variant="default" />
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
                  <div className="text-sm text-gray-500">{item.madeby}</div>
                </div>
                <Badge variant="gray">{item.type}</Badge>
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
                  <div className="text-sm text-gray-500">{item.madeby}</div>
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

function MediaCard({ item }: { item: MediaType }) {
  const typeIcons = {
    movie: Film,
    tv: Tv,
    book: Book,
  };
  const Icon = typeIcons[item.type as keyof typeof typeIcons];

  return (
    <Card className="overflow-hidden group">
      <div className="flex flex-col space-y-4">
        <div className="w-full aspect-video flex items-center justify-center bg-gray-100 rounded-lg">
          <Icon className="w-16 h-16 text-black" />
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
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
              {item.madeby} • {item.release}
            </div>
          </div>
          <CardDescription>{item.comment}</CardDescription>
          <div className="flex items-center space-x-4 text-sm text-notion-gray-dark">
            {item.type !== "book" && item.reconsumed > 0 && (
              <div className="flex items-center">
                <span className="mr-1">Watched {item.reconsumed} times</span>
              </div>
            )}
            {item.type === "book" && item.reconsumed > 0 && (
              <div className="flex items-center">
                <span className="mr-1">Read {item.reconsumed} times</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

export function Media() {
  const [activeTab, setActiveTab] = useState<"overview" | "all" | "movie" | "tv" | "book">("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const { data: mediaItems, loading, error } = useSupabaseQuery<MediaType>("media", {
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
      label: "All Media"
    },
    { 
      id: "movie", 
      label: (
        <div className="flex items-center space-x-2">
          <Film className="w-4 h-4" />
          <span>Movies</span>
        </div>
      )
    },
    { 
      id: "tv", 
      label: (
        <div className="flex items-center space-x-2">
          <Tv className="w-4 h-4" />
          <span>TV Shows</span>
        </div>
      )
    },
    { 
      id: "book", 
      label: (
        <div className="flex items-center space-x-2">
          <Book className="w-4 h-4" />
          <span>Books</span>
        </div>
      )
    },
  ];

  const filteredMedia = mediaItems?.filter((item) => {
    const matchesTab = activeTab === "overview" || activeTab === "all" || item.type === activeTab;
    const matchesSearch = searchTerm === "" || 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.madeby.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.comment && item.comment.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesTab && matchesSearch;
  }) || [];

  if (error) {
    return (
      <div className="notion-page pt-32">
        <Section title="Error" subtitle="Failed to load media data">
          <Alert variant="error">{error.message}</Alert>
        </Section>
      </div>
    );
  }

  return (
    <div className="notion-page pt-32">
      <Section
        title="My Media Collection"
        subtitle="Tracking my favorite movies, TV shows, and books"
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
                placeholder="Search by title, creator, or type..."
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
              <MediaOverview mediaItems={mediaItems || []} />
            )
          ) : (
            <>
              {searchTerm && (
                <div className="text-sm text-gray-500">
                  Found {filteredMedia.length} results for "{searchTerm}"
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
                  filteredMedia.map((item) => <MediaCard key={item.uuid} item={item} />)
                )}
              </Grid>
            </>
          )}
        </div>
      </Section>
    </div>
  );
}