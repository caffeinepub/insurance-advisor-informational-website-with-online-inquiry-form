import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowLeft, AlertCircle, Loader2, Mail, Phone, Building2, MessageSquare } from 'lucide-react';
import SiteLayout from '@/components/layout/SiteLayout';
import LoginButton from '@/components/auth/LoginButton';
import { useAdminStatus } from '@/hooks/useAdminStatus';
import { useInquiries } from '@/hooks/useInquiries';
import { insuranceTypes } from '@/content/insuranceContent';

export default function AdminDashboardPage() {
  const { isAdmin, isLoading: adminLoading, isAuthenticated } = useAdminStatus();
  const {
    inquiries,
    selectedInquiry,
    selectInquiry,
    filterType,
    setFilterType,
    isLoading: inquiriesLoading,
  } = useInquiries();

  const navigateToHome = () => {
    window.location.hash = '';
  };

  // Show loading state
  if (adminLoading) {
    return (
      <SiteLayout>
        <div className="container py-20 flex items-center justify-center min-h-[60vh]">
          <div className="text-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      </SiteLayout>
    );
  }

  // Show login prompt if not authenticated
  if (!isAuthenticated) {
    return (
      <SiteLayout>
        <div className="container py-20">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Admin Access Required</CardTitle>
              <CardDescription>
                Please sign in with Internet Identity to access the admin dashboard.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <LoginButton />
              <Button variant="outline" onClick={navigateToHome} className="w-full">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </CardContent>
          </Card>
        </div>
      </SiteLayout>
    );
  }

  // Show access denied if authenticated but not admin
  if (!isAdmin) {
    return (
      <SiteLayout>
        <div className="container py-20">
          <Alert variant="destructive" className="max-w-md mx-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Access Denied</AlertTitle>
            <AlertDescription className="mt-2 space-y-4">
              <p>You do not have permission to access the admin dashboard.</p>
              <div className="flex gap-2">
                <LoginButton />
                <Button variant="outline" onClick={navigateToHome}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      </SiteLayout>
    );
  }

  // Admin dashboard content
  return (
    <SiteLayout>
      <div className="container py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage and review insurance inquiries</p>
          </div>
          <div className="flex items-center gap-4">
            <LoginButton />
            <Button variant="outline" onClick={navigateToHome}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Inquiries List */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Inquiries</CardTitle>
                    <CardDescription>
                      {inquiries.length} {filterType === 'all' ? 'total' : 'filtered'} inquiries
                    </CardDescription>
                  </div>
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      {insuranceTypes.map((type) => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                {inquiriesLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  </div>
                ) : inquiries.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No inquiries found
                  </div>
                ) : (
                  <ScrollArea className="h-[600px]">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Phone</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Company</TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {inquiries.map((inquiry) => (
                          <TableRow
                            key={inquiry.id.toString()}
                            className={`cursor-pointer ${
                              selectedInquiry?.id === inquiry.id ? 'bg-muted' : ''
                            }`}
                            onClick={() => selectInquiry(inquiry.id)}
                          >
                            <TableCell className="font-mono text-xs">
                              #{inquiry.id.toString()}
                            </TableCell>
                            <TableCell className="font-medium">{inquiry.name}</TableCell>
                            <TableCell>{inquiry.state.phone}</TableCell>
                            <TableCell>
                              <Badge variant="outline">
                                {insuranceTypes.find(t => t.id === inquiry.state.insuranceType)?.title || inquiry.state.insuranceType}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              {inquiry.state.preferredCompany || '—'}
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  selectInquiry(inquiry.id);
                                }}
                              >
                                View
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Inquiry Details */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Inquiry Details</CardTitle>
                <CardDescription>
                  {selectedInquiry ? `ID: #${selectedInquiry.id.toString()}` : 'Select an inquiry to view details'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedInquiry ? (
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-lg mb-4">{selectedInquiry.name}</h3>
                      
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <Phone className="h-4 w-4 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="text-sm font-medium">Phone</p>
                            <p className="text-sm text-muted-foreground">{selectedInquiry.state.phone}</p>
                          </div>
                        </div>

                        {selectedInquiry.state.email && (
                          <div className="flex items-start gap-3">
                            <Mail className="h-4 w-4 text-muted-foreground mt-0.5" />
                            <div>
                              <p className="text-sm font-medium">Email</p>
                              <p className="text-sm text-muted-foreground">{selectedInquiry.state.email}</p>
                            </div>
                          </div>
                        )}

                        <Separator />

                        <div>
                          <p className="text-sm font-medium mb-2">Insurance Type</p>
                          <Badge>
                            {insuranceTypes.find(t => t.id === selectedInquiry.state.insuranceType)?.title || selectedInquiry.state.insuranceType}
                          </Badge>
                        </div>

                        {selectedInquiry.state.preferredCompany && (
                          <div className="flex items-start gap-3">
                            <Building2 className="h-4 w-4 text-muted-foreground mt-0.5" />
                            <div>
                              <p className="text-sm font-medium">Preferred Company</p>
                              <p className="text-sm text-muted-foreground">{selectedInquiry.state.preferredCompany}</p>
                            </div>
                          </div>
                        )}

                        <Separator />

                        <div className="flex items-start gap-3">
                          <MessageSquare className="h-4 w-4 text-muted-foreground mt-0.5" />
                          <div className="flex-1">
                            <p className="text-sm font-medium mb-2">Requirements</p>
                            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                              {selectedInquiry.state.message}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <Button className="w-full" asChild>
                        <a href={`tel:${selectedInquiry.state.phone}`}>
                          <Phone className="mr-2 h-4 w-4" />
                          Call Customer
                        </a>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    Select an inquiry from the list to view details
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
