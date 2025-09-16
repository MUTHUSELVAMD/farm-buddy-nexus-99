import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { 
  Upload, 
  Camera, 
  AlertCircle, 
  CheckCircle, 
  Leaf, 
  Bug,
  Droplets,
  Sun,
  Shield,
  Loader2
} from 'lucide-react';

interface DiseaseDiagnosis {
  disease: string;
  confidence: number;
  severity: 'Low' | 'Medium' | 'High';
  causes: string[];
  symptoms: string[];
  treatments: {
    organic: string[];
    chemical: string[];
  };
  prevention: string[];
}

const DiseaseDetection = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [diagnosis, setDiagnosis] = useState<DiseaseDiagnosis | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock disease data
  const mockDiagnoses: DiseaseDiagnosis[] = [
    {
      disease: 'Late Blight',
      confidence: 94,
      severity: 'High',
      causes: ['High humidity', 'Cool temperatures', 'Poor air circulation'],
      symptoms: ['Dark brown spots on leaves', 'White fuzzy growth on leaf undersides', 'Rapid leaf death'],
      treatments: {
        organic: [
          'Apply copper-based fungicides',
          'Remove affected leaves immediately',
          'Improve air circulation around plants',
          'Use baking soda spray (1 tsp per quart water)'
        ],
        chemical: [
          'Apply chlorothalonil fungicide',
          'Use mancozeb preventive spray',
          'Apply propiconazole for severe cases'
        ]
      },
      prevention: [
        'Plant resistant varieties',
        'Ensure proper spacing between plants',
        'Water at soil level, not on leaves',
        'Remove plant debris regularly'
      ]
    },
    {
      disease: 'Powdery Mildew',
      confidence: 87,
      severity: 'Medium',
      causes: ['High humidity', 'Poor air circulation', 'Overcrowding'],
      symptoms: ['White powdery coating on leaves', 'Yellowing of leaves', 'Stunted growth'],
      treatments: {
        organic: [
          'Spray with milk solution (1:10 ratio)',
          'Apply neem oil weekly',
          'Use sulfur-based fungicides',
          'Baking soda spray treatment'
        ],
        chemical: [
          'Apply myclobutanil fungicide',
          'Use tebuconazole spray',
          'Apply potassium bicarbonate'
        ]
      },
      prevention: [
        'Ensure good air circulation',
        'Avoid overhead watering',
        'Plant in sunny locations',
        'Remove infected plant material'
      ]
    }
  ];

  const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      setDiagnosis(null);
    }
  }, []);

  const handleAnalyze = async () => {
    if (!selectedImage) return;

    setIsLoading(true);
    
    try {
      // Mock API call - replace with actual backend integration
      const formData = new FormData();
      formData.append('image', selectedImage);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Mock response - randomly select a diagnosis
      const randomDiagnosis = mockDiagnoses[Math.floor(Math.random() * mockDiagnoses.length)];
      setDiagnosis(randomDiagnosis);

    } catch (error) {
      console.error('Error analyzing image:', error);
      // You could set an error state here
    } finally {
      setIsLoading(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'High': return 'bg-destructive text-destructive-foreground';
      case 'Medium': return 'bg-warning text-warning-foreground';
      case 'Low': return 'bg-success text-success-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'High': return AlertCircle;
      case 'Medium': return AlertCircle;
      case 'Low': return CheckCircle;
      default: return AlertCircle;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">
          Plant Disease Detection
        </h1>
        <p className="text-muted-foreground text-lg">
          Upload a photo of your plant to identify diseases and get treatment recommendations
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <Card className="agricultural-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5 text-primary" />
              Upload Plant Image
            </CardTitle>
            <CardDescription>
              Take a clear photo of the affected plant leaves or stems
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Upload Area */}
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
              {imagePreview ? (
                <div className="space-y-4">
                  <img
                    src={imagePreview}
                    alt="Uploaded plant"
                    className="max-w-full max-h-64 mx-auto rounded-lg shadow-md"
                  />
                  <div className="flex gap-2 justify-center">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedImage(null);
                        setImagePreview(null);
                        setDiagnosis(null);
                      }}
                    >
                      Remove Image
                    </Button>
                    <Button
                      onClick={handleAnalyze}
                      disabled={isLoading}
                      className="min-w-32"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Leaf className="mr-2 h-4 w-4" />
                          Analyze Plant
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <Upload className="h-12 w-12 text-muted-foreground mx-auto" />
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Upload Plant Photo</h3>
                    <p className="text-muted-foreground mb-4">
                      Choose a clear image showing the affected areas
                    </p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <Button asChild>
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <Camera className="mr-2 h-4 w-4" />
                        Choose Image
                      </label>
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Tips */}
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Photo Tips:</strong> Take photos in good lighting, focus on affected areas, 
                and include both healthy and diseased parts for better analysis.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Results Section */}
        <div className="space-y-6">
          {diagnosis && (
            <>
              <Card className="agricultural-card">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl text-foreground">{diagnosis.disease}</CardTitle>
                      <CardDescription>Disease identified with {diagnosis.confidence}% confidence</CardDescription>
                    </div>
                    <Badge className={getSeverityColor(diagnosis.severity)}>
                      {React.createElement(getSeverityIcon(diagnosis.severity), { className: "h-3 w-3 mr-1" })}
                      {diagnosis.severity} Risk
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Symptoms */}
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Bug className="h-4 w-4 text-primary" />
                      Symptoms
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {diagnosis.symptoms.map((symptom, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-success mt-0.5 flex-shrink-0" />
                          {symptom}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Separator />

                  {/* Causes */}
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-primary" />
                      Common Causes
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {diagnosis.causes.map((cause, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <AlertCircle className="h-3 w-3 text-warning mt-0.5 flex-shrink-0" />
                          {cause}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Treatment Options */}
              <Card className="agricultural-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Treatment Options
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Organic Treatments */}
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2 text-success">
                      <Leaf className="h-4 w-4" />
                      Organic Solutions (Recommended)
                    </h4>
                    <ul className="space-y-2 text-sm">
                      {diagnosis.treatments.organic.map((treatment, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 text-success mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{treatment}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Separator />

                  {/* Chemical Treatments */}
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2 text-warning">
                      <Droplets className="h-4 w-4" />
                      Chemical Solutions
                    </h4>
                    <ul className="space-y-2 text-sm">
                      {diagnosis.treatments.chemical.map((treatment, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <AlertCircle className="h-3 w-3 text-warning mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{treatment}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Alert>
                    <Shield className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Safety Note:</strong> Always follow label instructions when using chemical treatments. 
                      Consider organic solutions first for environmental safety.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              {/* Prevention */}
              <Card className="agricultural-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sun className="h-5 w-5 text-primary" />
                    Prevention Tips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    {diagnosis.prevention.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-3 w-3 text-success mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </>
          )}

          {/* Empty State */}
          {!diagnosis && !isLoading && (
            <Card className="agricultural-card text-center py-12">
              <CardContent>
                <Camera className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Upload an Image to Get Started</h3>
                <p className="text-muted-foreground">
                  Take a clear photo of your plant and our AI will analyze it for diseases and provide treatment recommendations.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiseaseDetection;