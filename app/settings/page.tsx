"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ProtectedRoute } from "@/components/protected-route"
import { FeedbackForm } from "@/components/feedback-form"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/hooks/use-toast"
import { Calculator, Crown, Edit, Trash2, User } from "lucide-react"

// ===== SETTINGS PAGE =====
export default function SettingsPage() {
  const { user, logout } = useAuth()
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [bmiData, setBmiData] = useState({ weight: "", height: "", result: null })

  // ===== BMI CALCULATION =====
  const calculateBMI = () => {
    const weight = Number.parseFloat(bmiData.weight)
    const height = Number.parseFloat(bmiData.height)

    if (!weight || !height || weight <= 0 || height <= 0) {
      toast({
        title: "Invalid Input",
        description: "Please enter valid weight and height values.",
        variant: "destructive",
      })
      return
    }

    const bmi = weight / (height * height)
    let category = ""

    if (bmi < 18.5) category = "Underweight"
    else if (bmi < 25) category = "Normal weight"
    else if (bmi < 30) category = "Overweight"
    else category = "Obese"

    setBmiData((prev) => ({
      ...prev,
      result: { value: bmi.toFixed(1), category },
    }))

    toast({
      title: "BMI Calculated",
      description: `Your BMI is ${bmi.toFixed(1)} (${category})`,
    })
  }

  // ===== HANDLE PROFILE UPDATE =====
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    setIsEditing(false)
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully.",
    })
  }

  // ===== HANDLE ACCOUNT DELETION =====
  const handleDeleteAccount = () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      logout()
      toast({
        title: "Account Deleted",
        description: "Your account has been deleted successfully.",
      })
    }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Header />

        {/* ===== HEADER SECTION ===== */}
        <div className="relative food-gradient">
          <div className="absolute inset-0 bg-black/20" />
          <div className="container relative z-10 py-16 md:py-24">
            <div className="flex flex-col items-center text-center space-y-4">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white">Settings & Profile</h1>
              <p className="text-lg text-white/90 max-w-2xl">Manage your account, preferences, and health tracking.</p>
            </div>
          </div>
        </div>

        <div className="container py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* ===== PROFILE INFORMATION ===== */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <User className="h-5 w-5 text-orange-500" />
                      <CardTitle>Profile Information</CardTitle>
                    </div>
                    {user?.isPremium && (
                      <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                        <Crown className="h-3 w-3 mr-1" />
                        Premium
                      </Badge>
                    )}
                  </div>
                  <CardDescription>Manage your personal information and account settings</CardDescription>
                </CardHeader>
                <CardContent>
                  {isEditing ? (
                    <form onSubmit={handleProfileUpdate} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" defaultValue={user?.name} placeholder="Enter your full name" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue={user?.email} placeholder="Enter your email" />
                      </div>
                      <div className="flex space-x-2">
                        <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
                          Save Changes
                        </Button>
                        <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                          Cancel
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm text-muted-foreground">Name</Label>
                        <p className="font-medium">{user?.name}</p>
                      </div>
                      <div>
                        <Label className="text-sm text-muted-foreground">Email</Label>
                        <p className="font-medium">{user?.email}</p>
                      </div>
                      <div>
                        <Label className="text-sm text-muted-foreground">Account Type</Label>
                        <p className="font-medium">{user?.isPremium ? "Premium Member" : "Free Member"}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
                {!isEditing && (
                  <CardFooter>
                    <Button variant="outline" onClick={() => setIsEditing(true)} className="mr-2">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  </CardFooter>
                )}
              </Card>

              {/* ===== FEEDBACK FORM ===== */}
              <FeedbackForm />

              {/* ===== ACCOUNT ACTIONS ===== */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-red-600">Danger Zone</CardTitle>
                  <CardDescription>Irreversible actions that will affect your account</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="destructive" onClick={handleDeleteAccount} className="w-full">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Account
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* ===== BMI CALCULATOR ===== */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Calculator className="h-5 w-5 text-orange-500" />
                    <CardTitle>BMI Calculator</CardTitle>
                  </div>
                  <CardDescription>Calculate your Body Mass Index to track your health</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      placeholder="Enter your weight in kg"
                      value={bmiData.weight}
                      onChange={(e) => setBmiData((prev) => ({ ...prev, weight: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="height">Height (m)</Label>
                    <Input
                      id="height"
                      type="number"
                      step="0.01"
                      placeholder="Enter your height in meters"
                      value={bmiData.height}
                      onChange={(e) => setBmiData((prev) => ({ ...prev, height: e.target.value }))}
                    />
                  </div>
                  <Button
                    onClick={calculateBMI}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                  >
                    Calculate BMI
                  </Button>

                  {bmiData.result && (
                    <>
                      <Separator />
                      <div className="text-center space-y-2">
                        <h3 className="text-2xl font-bold text-orange-500">{bmiData.result.value}</h3>
                        <p className="text-muted-foreground">
                          Category: <span className="font-medium">{bmiData.result.category}</span>
                        </p>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* ===== HEALTH TIPS ===== */}
              <Card className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
                <CardHeader>
                  <CardTitle className="text-green-700 dark:text-green-400">Health Tips</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm">
                    <p className="font-medium mb-1">BMI Categories:</p>
                    <ul className="text-muted-foreground space-y-1">
                      <li>• Underweight: Below 18.5</li>
                      <li>• Normal weight: 18.5-24.9</li>
                      <li>• Overweight: 25-29.9</li>
                      <li>• Obese: 30 and above</li>
                    </ul>
                  </div>
                  <Separator />
                  <p className="text-sm text-muted-foreground">
                    Remember: BMI is just one indicator of health. Consult with healthcare professionals for
                    comprehensive health assessment.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </ProtectedRoute>
  )
}
