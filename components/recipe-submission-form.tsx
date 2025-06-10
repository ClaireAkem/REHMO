"use client"

import React, { useState, useRef } from "react"
import type { ChangeEvent, FormEvent, RefObject } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/components/auth-provider"
import { supabase } from "@/lib/supabaseClient" // Import Supabase client
import { Upload, X, Video, FileVideo, Clock, AlertCircle } from "lucide-react"

// ===== RECIPE SUBMISSION FORM COMPONENT =====
export function RecipeSubmissionForm({ onRecipeSubmitted }: { onRecipeSubmitted?: () => void }) {
  const { user } = useAuth()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null)
  const [videoPreview, setVideoPreview] = useState<string | null>(null)
  const [videoDuration, setVideoDuration] = useState<number>(0)
  const [uploadProgress, setUploadProgress] = useState<number>(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const formRef = useRef<HTMLFormElement | null>(null)

  // ===== HANDLE IMAGE UPLOAD =====
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Check file size (max 10MB for images)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Please select an image smaller than 10MB.",
          variant: "destructive",
        })
        return
      }

      setSelectedImage(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // ===== HANDLE VIDEO UPLOAD =====
  const handleVideoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Check file size (max 100MB for videos)
      if (file.size > 100 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Please select a video smaller than 100MB.",
          variant: "destructive",
        })
        return
      }

      // Check file type
      if (!file.type.startsWith("video/")) {
        toast({
          title: "Invalid File Type",
          description: "Please select a valid video file (MP4, MOV, AVI, etc.).",
          variant: "destructive",
        })
        return
      }

      // Create video element to check duration
      const video = document.createElement("video")
      video.preload = "metadata"

      video.onloadedmetadata = () => {
        const duration = video.duration
        setVideoDuration(duration)

        // Check if video is longer than 5 minutes (300 seconds)
        if (duration > 300) {
          toast({
            title: "Video Too Long",
            description: "Please select a video that is 5 minutes or shorter.",
            variant: "destructive",
          })
          return
        }

        setSelectedVideo(file)
        const reader = new FileReader()
        reader.onload = (e) => {
          setVideoPreview(e.target?.result as string)
        }
        reader.readAsDataURL(file)
      }

      video.onerror = () => {
        toast({
          title: "Invalid Video",
          description: "Unable to process the selected video file.",
          variant: "destructive",
        })
      }

      video.src = URL.createObjectURL(file)
    }
  }

  // ===== REMOVE IMAGE =====
  const removeImage = () => {
    setSelectedImage(null)
    setImagePreview(null)
  }

  // ===== REMOVE VIDEO =====
  const removeVideo = () => {
    setSelectedVideo(null)
    setVideoPreview(null)
    setVideoDuration(0)
    setIsVideoPlaying(false)
  }

  // ===== FORMAT DURATION =====
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  // ===== HANDLE FORM SUBMISSION =====
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "You must be logged in to submit a recipe.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    setUploadProgress(0) // Reset progress for video simulation

    const formData = new FormData(e.currentTarget)

    try {
      // Log current Supabase session
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      console.log("SUPABASE SESSION BEFORE UPLOAD:", JSON.stringify(sessionData, null, 2));
      if (sessionError) {
        console.error("ERROR GETTING SUPABASE SESSION:", JSON.stringify(sessionError, null, 2));
      }
      if (!sessionData?.session) { // Check if session object itself is null or session property is null
        console.warn("NO ACTIVE SUPABASE SESSION DETECTED BEFORE UPLOAD.");
        // Optionally, you could throw an error here or prevent the upload
        // throw new Error("User session is not active. Please log in again.");
      }

      let imagePath: string | undefined = undefined
      let videoPath: string | undefined = undefined

      // 1. Upload Image if selected
      if (selectedImage) {
        const uniqueImageName = `${Date.now()}-${selectedImage.name}`
        const { data: imageData, error: imageError } = await supabase.storage
          .from('recipe-images')
          .upload(`public/${uniqueImageName}`, selectedImage)

        if (imageError) {
          console.error("IMAGE UPLOAD ERROR DETAILS:", JSON.stringify(imageError, null, 2));
          throw new Error(`Image upload failed: ${imageError.message || 'Unknown Supabase error'}`);
        }
        imagePath = imageData.path // Store path for potential cleanup
        setUploadProgress(prev => prev + (selectedVideo ? 40 : 80)) // Partial progress
      }

      // 2. Upload Video if selected
      if (selectedVideo) {
        const uniqueVideoName = `${Date.now()}-${selectedVideo.name}`
        const { data: videoData, error: videoError } = await supabase.storage
          .from('recipe-videos')
          .upload(`public/${uniqueVideoName}`, selectedVideo)
        
        setUploadProgress(prev => prev + (selectedImage ? 40 : 80)) // Update progress

        if (videoError) {
          console.error("VIDEO UPLOAD ERROR DETAILS:", JSON.stringify(videoError, null, 2));
          throw new Error(`Video upload failed: ${videoError.message || 'Unknown Supabase error'}`);
        }
        videoPath = videoData.path // Store path for potential cleanup
      }

      setUploadProgress(90) // Progress before DB insert

      // 3. Insert recipe data into Supabase
      const recipeData = {
        user_id: user.id,
        title: formData.get("title") as string,
        category: formData.get("category") as string,
        introduction: formData.get("introduction") as string,
        ingredients: formData.get("ingredients") as string,
        instructions: formData.get("instructions") as string,
        image_path: imagePath, // Store the path from Supabase storage
        video_path: videoPath, // Store the path from Supabase storage
        video_duration_seconds: videoDuration > 0 ? Math.floor(videoDuration) : null,
        submitted_by_name: user.name, // Already available from auth context
        // created_at is set by default in Supabase
      }

      const { error: insertError } = await supabase.from('recipes').insert([recipeData])

      if (insertError) {
        console.error("DATABASE INSERT ERROR DETAILS:", JSON.stringify(insertError, null, 2));
        // Attempt to delete uploaded files if DB insert fails to avoid orphaned files
        if (imagePath) await supabase.storage.from('recipe-images').remove([imagePath])
        if (videoPath) await supabase.storage.from('recipe-videos').remove([videoPath])
        throw new Error(`Database submission failed: ${insertError.message || 'Unknown Supabase error'}`);
      }

      setUploadProgress(100)
      toast({
        title: "Recipe Submitted Successfully!",
        description: "Your recipe has been submitted and will be reviewed before publishing.",
      })

      // Reset form fields by updating state
      if (onRecipeSubmitted) {
        onRecipeSubmitted();
      }
      setSelectedImage(null);
      setSelectedVideo(null);
      setImagePreview(null);
      setVideoPreview(null);
      setUploadProgress(0)
    } catch (error: any) {
      console.error("CAUGHT ERROR IN handleSubmit:", error); // Log the whole error object
      console.error("CAUGHT ERROR MESSAGE:", error.message);
      console.error("CAUGHT ERROR STACK:", error.stack);
      toast({
        title: "Submission Failed",
        description: error.message || "An unexpected error occurred.",
        variant: "destructive",
      })
      // Cleanup logic for orphaned files is already inside the try block if insertError occurs
    } finally {
      setIsSubmitting(false)
      setUploadProgress(0) // Reset progress in finally
    }
  }

  if (!user) {
    return (
      <Card>
        <CardContent className="pt-6 text-center">
          <p className="text-muted-foreground">Please sign in to submit your own recipes.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submit Your African Recipe</CardTitle>
        <CardDescription>Share your favorite African dish with the REHMO community</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} ref={formRef} className="space-y-6">
          {/* ===== RECIPE TITLE ===== */}
          <div className="space-y-2">
            <Label htmlFor="title">Recipe Title *</Label>
            <Input id="title" name="title" placeholder="Enter your recipe title" required />
          </div>

          {/* ===== CATEGORY SELECTION ===== */}
          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select name="category" required>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vegetarian">Vegetarian</SelectItem>
                <SelectItem value="non-vegetarian">Non-Vegetarian</SelectItem>
                <SelectItem value="others">Others</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* ===== SHORT INTRODUCTION ===== */}
          <div className="space-y-2">
            <Label htmlFor="introduction">Short Introduction *</Label>
            <Textarea
              id="introduction"
              name="introduction"
              placeholder="Describe your recipe in a few sentences..."
              rows={3}
              required
            />
          </div>

          {/* ===== INGREDIENTS ===== */}
          <div className="space-y-2">
            <Label htmlFor="ingredients">Ingredients *</Label>
            <Textarea
              id="ingredients"
              name="ingredients"
              placeholder="List all ingredients (one per line)..."
              rows={6}
              required
            />
          </div>

          {/* ===== INSTRUCTIONS ===== */}
          <div className="space-y-2">
            <Label htmlFor="instructions">Cooking Instructions *</Label>
            <Textarea
              id="instructions"
              name="instructions"
              placeholder="Provide step-by-step cooking instructions..."
              rows={8}
              required
            />
          </div>

          {/* ===== IMAGE UPLOAD ===== */}
          <div className="space-y-2">
            <Label htmlFor="image">Recipe Image</Label>
            {imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview || "/placeholder.svg"}
                  alt="Recipe preview"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={removeImage}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-2">Upload a photo of your dish</p>
                <p className="text-xs text-muted-foreground mb-2">Max file size: 10MB</p>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="max-w-xs mx-auto"
                />
              </div>
            )}
          </div>

          {/* ===== VIDEO UPLOAD ===== */}
          <div className="space-y-2">
            <Label htmlFor="video">Cooking Video (Optional)</Label>
            <div className="text-xs text-muted-foreground mb-2 flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              Maximum duration: 5 minutes | Max file size: 100MB
            </div>

            {videoPreview ? (
              <div className="relative">
                <div className="relative bg-black rounded-lg overflow-hidden">
                  <video
                    src={videoPreview}
                    className="w-full h-64 object-contain"
                    controls
                    onPlay={() => setIsVideoPlaying(true)}
                    onPause={() => setIsVideoPlaying(false)}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={removeVideo}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {/* Video Info */}
                <div className="mt-2 p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <FileVideo className="h-4 w-4 text-blue-500" />
                      <span className="font-medium">{selectedVideo?.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{formatDuration(videoDuration)}</span>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">
                    File size: {selectedVideo ? (selectedVideo.size / (1024 * 1024)).toFixed(1) : 0} MB
                  </div>
                </div>
              </div>
            ) : (
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                <Video className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-2">Upload a cooking video (optional)</p>
                <p className="text-xs text-muted-foreground mb-2">Show your cooking process step by step</p>
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <AlertCircle className="h-3 w-3 text-amber-500" />
                  <span className="text-xs text-amber-600">Max 5 minutes, 100MB</span>
                </div>
                <Input
                  id="video"
                  type="file"
                  accept="video/*"
                  onChange={handleVideoUpload}
                  className="max-w-xs mx-auto"
                />
              </div>
            )}
          </div>

          {/* ===== UPLOAD PROGRESS ===== */}
          {isSubmitting && selectedVideo && uploadProgress < 100 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Uploading video...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="w-full" />
            </div>
          )}

          {/* ===== SUBMISSION GUIDELINES ===== */}
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Submission Guidelines</h4>
            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
              <li>• Ensure your recipe is authentic and tested</li>
              <li>• Include clear, step-by-step instructions</li>
              <li>• If adding a video, show the key cooking steps clearly</li>
              <li>• Videos should be well-lit and easy to follow</li>
              <li>• All submissions will be reviewed before publishing</li>
            </ul>
          </div>

          {/* ===== SUBMIT BUTTON ===== */}
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
            disabled={isSubmitting}
          >
            {isSubmitting ? (selectedVideo ? "Uploading Video & Submitting..." : "Submitting...") : "Submit Recipe"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
