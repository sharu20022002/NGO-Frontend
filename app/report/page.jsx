"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, FileText } from "lucide-react";
import { toast } from "sonner";

export default function SubmitReportPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    ngoId: "",
    month: "",
    peopleHelped: "",
    eventsConducted: "",
    fundsUtilized: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.ngoId.trim()) {
      newErrors.ngoId = "NGO ID is required";
    }

    if (!formData.month) {
      newErrors.month = "Month is required";
    } else if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(formData.month)) {
      newErrors.month = "Month must be in YYYY-MM format";
    }

    if (!formData.peopleHelped || Number.parseInt(formData.peopleHelped) < 0) {
      newErrors.peopleHelped = "Please enter a valid number of people helped";
    }

    if (
      !formData.eventsConducted ||
      Number.parseInt(formData.eventsConducted) < 0
    ) {
      newErrors.eventsConducted = "Please enter a valid number of events";
    }

    if (
      !formData.fundsUtilized ||
      Number.parseFloat(formData.fundsUtilized) < 0
    ) {
      newErrors.fundsUtilized = "Please enter a valid amount";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("https://ngo-backend-amww.onrender.com/api/report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          peopleHelped: Number.parseInt(formData.peopleHelped),
          eventsConducted: Number.parseInt(formData.eventsConducted),
          fundsUtilized: Number.parseFloat(formData.fundsUtilized),
        }),
      });

      if (response.ok) {
        toast.success("Report submitted successfully");

        // Reset form
        setFormData({
          ngoId: "",
          month: "",
          peopleHelped: "",
          eventsConducted: "",
          fundsUtilized: "",
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit report");
      }
    } catch (error) {
      toast.error("Failed to submit report");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Submit Monthly Report</span>
          </CardTitle>
          <CardDescription>
            Submit your NGO's monthly impact data to track progress and showcase
            your work.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="ngoId">NGO ID *</Label>
              <Input
                id="ngoId"
                placeholder="Enter your NGO ID"
                value={formData.ngoId}
                onChange={(e) => handleInputChange("ngoId", e.target.value)}
                className={errors.ngoId ? "border-destructive" : ""}
              />
              {errors.ngoId && (
                <p className="text-sm text-destructive">{errors.ngoId}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="month">Month *</Label>
              <Input
                id="month"
                type="month"
                value={formData.month}
                placeholder="YYYY-MM"
                onChange={(e) => handleInputChange("month", e.target.value)}
                className={errors.month ? "border-destructive" : ""}
              />
              {errors.month && (
                <p className="text-sm text-destructive">{errors.month}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="peopleHelped">People Helped *</Label>
              <Input
                id="peopleHelped"
                type="number"
                min="0"
                placeholder="Number of people helped"
                value={formData.peopleHelped}
                onChange={(e) =>
                  handleInputChange("peopleHelped", e.target.value)
                }
                className={errors.peopleHelped ? "border-destructive" : ""}
              />
              {errors.peopleHelped && (
                <p className="text-sm text-destructive">
                  {errors.peopleHelped}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="eventsConducted">Events Conducted *</Label>
              <Input
                id="eventsConducted"
                type="number"
                min="0"
                placeholder="Number of events conducted"
                value={formData.eventsConducted}
                onChange={(e) =>
                  handleInputChange("eventsConducted", e.target.value)
                }
                className={errors.eventsConducted ? "border-destructive" : ""}
              />
              {errors.eventsConducted && (
                <p className="text-sm text-destructive">
                  {errors.eventsConducted}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="fundsUtilized">Funds Utilized (₹) *</Label>
              <Input
                id="fundsUtilized"
                type="number"
                min="0"
                step="0.01"
                placeholder="Amount in rupees"
                value={formData.fundsUtilized}
                onChange={(e) =>
                  handleInputChange("fundsUtilized", e.target.value)
                }
                className={errors.fundsUtilized ? "border-destructive" : ""}
              />
              {errors.fundsUtilized && (
                <p className="text-sm text-destructive">
                  {errors.fundsUtilized}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Report"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
