"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Search,
  Hash,
  Bell,
  Mail,
  Bookmark,
  FileText,
  User,
  MoreHorizontal,
  MessageCircle,
  Repeat2,
  Heart,
  Share,
  Home,
  PenTool,
  X,
} from "lucide-react"
import blogPosts from "@/data/blog-posts.json"

interface BlogPost {
  id: number
  author: {
    name: string
    username: string
    avatar: string
    verified: boolean
  }
  title: string
  excerpt: string
  content: string
  image: string
  tags: string[]
  timestamp: string
  likes: number
  comments: number
  shares: number
}

export function BlogFeed() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)

  const handlePostClick = (post: BlogPost) => {
    setSelectedPost(post)
  }

  const closeModal = () => {
    setSelectedPost(null)
  }

  return (
    <div className="min-h-screen bg-background flex font-sans">
      {/* Left Sidebar */}
      <div className="w-64 border-r border-border p-4 fixed h-full bg-sidebar">
        <div className="mb-8">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <PenTool className="w-5 h-5 text-primary-foreground" />
          </div>
        </div>

        <nav className="space-y-2">
          <div className="flex items-center space-x-4 p-3 rounded-full hover:bg-sidebar-accent text-sidebar-foreground font-bold">
            <Home className="w-6 h-6" />
            <span className="text-xl">Feed</span>
          </div>
          <div className="flex items-center space-x-4 p-3 rounded-full hover:bg-sidebar-accent text-sidebar-foreground">
            <Hash className="w-6 h-6" />
            <span className="text-xl">Categories</span>
          </div>
          <div className="flex items-center space-x-4 p-3 rounded-full hover:bg-sidebar-accent text-sidebar-foreground">
            <Bell className="w-6 h-6" />
            <span className="text-xl">Notifications</span>
          </div>
          <div className="flex items-center space-x-4 p-3 rounded-full hover:bg-sidebar-accent text-sidebar-foreground">
            <Mail className="w-6 h-6" />
            <span className="text-xl">Messages</span>
          </div>
          <div className="flex items-center space-x-4 p-3 rounded-full hover:bg-sidebar-accent text-sidebar-foreground">
            <Bookmark className="w-6 h-6" />
            <span className="text-xl">Saved</span>
          </div>
          <div className="flex items-center space-x-4 p-3 rounded-full hover:bg-sidebar-accent text-sidebar-foreground">
            <FileText className="w-6 h-6" />
            <span className="text-xl">Drafts</span>
          </div>
          <div className="flex items-center space-x-4 p-3 rounded-full hover:bg-sidebar-accent text-sidebar-foreground">
            <User className="w-6 h-6" />
            <span className="text-xl">Profile</span>
          </div>
          <div className="flex items-center space-x-4 p-3 rounded-full hover:bg-sidebar-accent text-sidebar-foreground">
            <MoreHorizontal className="w-6 h-6" />
            <span className="text-xl">More</span>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 mr-80">
        <div className="border-r border-border">
          {/* Header */}
          <div className="sticky top-0 bg-background/80 backdrop-blur border-b border-border p-4">
            <h1 className="text-xl font-bold text-foreground">Personal Blog Feed</h1>
          </div>

          {/* Blog Posts */}
          <div className="divide-y divide-border">
            {blogPosts.map((post) => (
              <div
                key={post.id}
                className="p-4 hover:bg-muted cursor-pointer transition-colors"
                onClick={() => handlePostClick(post)}
              >
                <div className="flex space-x-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-bold text-foreground">{post.author.name}</span>
                      {post.author.verified && <div className="w-4 h-4 bg-primary rounded-full"></div>}
                      <span className="text-muted-foreground">
                        @{post.author.username} • {post.timestamp}
                      </span>
                    </div>
                    <h3 className="font-bold text-foreground mb-2">{post.title}</h3>
                    <p className="text-foreground mb-3">
                      {post.excerpt}{" "}
                      {post.tags.map((tag) => (
                        <span key={tag} className="text-primary">
                          #{tag}{" "}
                        </span>
                      ))}
                    </p>
                    {post.image && (
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        className="w-full h-48 object-cover rounded-2xl mb-3"
                      />
                    )}
                    <div className="flex items-center space-x-16 text-muted-foreground">
                      <div className="flex items-center space-x-2 hover:text-primary cursor-pointer">
                        <MessageCircle className="w-5 h-5" />
                        <span className="text-sm">{post.comments}</span>
                      </div>
                      <div className="flex items-center space-x-2 hover:text-secondary cursor-pointer">
                        <Repeat2 className="w-5 h-5" />
                        <span className="text-sm">{post.shares}</span>
                      </div>
                      <div className="flex items-center space-x-2 hover:text-red-500 cursor-pointer">
                        <Heart className="w-5 h-5" />
                        <span className="text-sm">{post.likes}</span>
                      </div>
                      <div className="flex items-center space-x-2 hover:text-primary cursor-pointer">
                        <Share className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-80 p-4 fixed right-0 h-full overflow-y-auto bg-background">
        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search Blog"
            className="pl-12 bg-muted border-none rounded-full text-foreground placeholder:text-muted-foreground"
          />
        </div>

        {/* Suggested Authors */}
        <div className="bg-card rounded-2xl p-4">
          <h2 className="text-xl font-bold text-card-foreground mb-4">Suggested Authors</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src="/mcfly-profile.jpg" />
                  <AvatarFallback>M</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center space-x-1">
                    <span className="font-bold text-card-foreground">McFly</span>
                    <div className="w-4 h-4 bg-primary rounded-full"></div>
                  </div>
                  <span className="text-sm text-muted-foreground">@levramcfly</span>
                </div>
              </div>
              <Button className="bg-primary hover:bg-primary/80 text-primary-foreground rounded-full px-4 py-1 text-sm">
                Follow
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src="/johndoe-profile.jpg" />
                  <AvatarFallback>J</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center space-x-1">
                    <span className="font-bold text-card-foreground">JohnDoe</span>
                    <div className="w-4 h-4 bg-primary rounded-full"></div>
                  </div>
                  <span className="text-sm text-muted-foreground">@johndoe</span>
                </div>
              </div>
              <Button className="bg-primary hover:bg-primary/80 text-primary-foreground rounded-full px-4 py-1 text-sm">
                Follow
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src="/janis-profile.jpg" />
                  <AvatarFallback>J</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center space-x-1">
                    <span className="font-bold text-card-foreground">Janis Joplin</span>
                    <div className="w-4 h-4 bg-primary rounded-full"></div>
                  </div>
                  <span className="text-sm text-muted-foreground">@janisjoplin</span>
                </div>
              </div>
              <Button className="bg-primary hover:bg-primary/80 text-primary-foreground rounded-full px-4 py-1 text-sm">
                Follow
              </Button>
            </div>
          </div>
          <button className="text-primary text-sm mt-3">Show more</button>
        </div>
      </div>

      {selectedPost && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-card-foreground">Post</h2>
              <button onClick={closeModal} className="p-2 hover:bg-muted rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="flex space-x-3 mb-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={selectedPost.author.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{selectedPost.author.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-card-foreground">{selectedPost.author.name}</span>
                    {selectedPost.author.verified && <div className="w-4 h-4 bg-primary rounded-full"></div>}
                  </div>
                  <span className="text-muted-foreground">
                    @{selectedPost.author.username} • {selectedPost.timestamp}
                  </span>
                </div>
              </div>
              <h1 className="text-2xl font-bold text-card-foreground mb-4">{selectedPost.title}</h1>
              {selectedPost.image && (
                <img
                  src={selectedPost.image || "/placeholder.svg"}
                  alt={selectedPost.title}
                  className="w-full h-64 object-cover rounded-2xl mb-6"
                />
              )}
              <div className="prose prose-lg max-w-none text-card-foreground mb-6">
                {selectedPost.content.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="mb-4 leading-relaxed">
                    {paragraph.startsWith("**") && paragraph.endsWith("**") ? (
                      <strong className="font-bold">{paragraph.slice(2, -2)}</strong>
                    ) : (
                      paragraph
                    )}
                  </p>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedPost.tags.map((tag) => (
                  <span key={tag} className="text-primary hover:underline cursor-pointer">
                    #{tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center space-x-16 text-muted-foreground border-t border-border pt-4">
                <div className="flex items-center space-x-2 hover:text-primary cursor-pointer">
                  <MessageCircle className="w-5 h-5" />
                  <span>{selectedPost.comments}</span>
                </div>
                <div className="flex items-center space-x-2 hover:text-secondary cursor-pointer">
                  <Repeat2 className="w-5 h-5" />
                  <span>{selectedPost.shares}</span>
                </div>
                <div className="flex items-center space-x-2 hover:text-red-500 cursor-pointer">
                  <Heart className="w-5 h-5" />
                  <span>{selectedPost.likes}</span>
                </div>
                <div className="flex items-center space-x-2 hover:text-primary cursor-pointer">
                  <Share className="w-5 h-5" />
                  <span>{selectedPost.shares}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
