'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ContentConfig } from '@/lib/content-config';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const [content, setContent] = useState<ContentConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('hero');
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const response = await fetch('/api/admin/content');
      if (response.ok) {
        const data = await response.json();
        setContent(data);
      } else {
        throw new Error('Failed to load content');
      }
    } catch (error) {
      console.error('Error loading content:', error);
      setMessage('Error loading content');
    } finally {
      setLoading(false);
    }
  };

  const saveContent = async () => {
    if (!content) return;
    
    setSaving(true);
    setMessage('');
    
    try {
      const response = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });
      
      if (response.ok) {
        setMessage('Content saved successfully!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        throw new Error('Failed to save content');
      }
    } catch (error) {
      console.error('Error saving content:', error);
      setMessage('Error saving content');
    } finally {
      setSaving(false);
    }
  };

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const updateContent = (path: string, value: any) => {
    if (!content) return;
    
    const keys = path.split('.');
    const newContent = { ...content };
    let current: any = newContent;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
    setContent(newContent);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-red-600">Failed to load content</div>
      </div>
    );
  }

  const tabs = [
    { id: 'site', label: 'Site Settings' },
    { id: 'hero', label: 'Hero Section' },
    { id: 'aiSearch', label: 'AI Search' },
    { id: 'lightningFast', label: 'Lightning Fast' },
    { id: 'srpCustomizer', label: 'SRP Customizer' },
    { id: 'contact', label: 'Contact' },
    { id: 'footer', label: 'Footer' },
    { id: 'legal', label: 'Legal Pages' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Content Management</h1>
            <div className="flex items-center space-x-4">
              {message && (
                <div className={`px-4 py-2 rounded ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                  {message}
                </div>
              )}
              <Button onClick={saveContent} disabled={saving}>
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button onClick={logout} variant="outline">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 pr-8">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow p-6">
              {/* Site Settings */}
              {activeTab === 'site' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Site Settings</h2>
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Site Title</label>
                      <Input
                        value={content.site.title}
                        onChange={(e) => updateContent('site.title', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Site Description</label>
                      <Textarea
                        value={content.site.description}
                        onChange={(e) => updateContent('site.description', e.target.value)}
                        rows={3}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Logo Path</label>
                      <Input
                        value={content.site.logo}
                        onChange={(e) => updateContent('site.logo', e.target.value)}
                        placeholder="/path/to/logo.svg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Favicon Path</label>
                      <Input
                        value={content.site.favicon}
                        onChange={(e) => updateContent('site.favicon', e.target.value)}
                        placeholder="/favicon.ico"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Hero Section */}
              {activeTab === 'hero' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Hero Section</h2>
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                      <Input
                        value={content.hero.title}
                        onChange={(e) => updateContent('hero.title', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Highlighted Word</label>
                      <Input
                        value={content.hero.highlightedWord}
                        onChange={(e) => updateContent('hero.highlightedWord', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                      <Input
                        value={content.hero.subtitle}
                        onChange={(e) => updateContent('hero.subtitle', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Video Source</label>
                      <Input
                        value={content.hero.videoSrc}
                        onChange={(e) => updateContent('hero.videoSrc', e.target.value)}
                        placeholder="/videos/hero-demo.webm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Video Poster</label>
                      <Input
                        value={content.hero.videoPoster}
                        onChange={(e) => updateContent('hero.videoPoster', e.target.value)}
                        placeholder="/images/posters/hero-demo-poster.webp"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Continue with other sections... */}
              {/* AI Search Section */}
              {activeTab === 'aiSearch' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">AI Search Section</h2>
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                      <Input
                        value={content.aiSearch.title}
                        onChange={(e) => updateContent('aiSearch.title', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Highlighted Text</label>
                      <Input
                        value={content.aiSearch.highlightedText}
                        onChange={(e) => updateContent('aiSearch.highlightedText', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                      <Textarea
                        value={content.aiSearch.subtitle}
                        onChange={(e) => updateContent('aiSearch.subtitle', e.target.value)}
                        rows={2}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Video Source</label>
                      <Input
                        value={content.aiSearch.videoSrc}
                        onChange={(e) => updateContent('aiSearch.videoSrc', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Video Poster</label>
                      <Input
                        value={content.aiSearch.videoPoster}
                        onChange={(e) => updateContent('aiSearch.videoPoster', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Lightning Fast Section */}
              {activeTab === 'lightningFast' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Lightning Fast Section</h2>
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Highlighted Word</label>
                      <Input
                        value={content.lightningFast.highlightedWord}
                        onChange={(e) => updateContent('lightningFast.highlightedWord', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                      <Input
                        value={content.lightningFast.subtitle}
                        onChange={(e) => updateContent('lightningFast.subtitle', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <Textarea
                        value={content.lightningFast.description}
                        onChange={(e) => updateContent('lightningFast.description', e.target.value)}
                        rows={4}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Video Source</label>
                      <Input
                        value={content.lightningFast.videoSrc}
                        onChange={(e) => updateContent('lightningFast.videoSrc', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Video Poster</label>
                      <Input
                        value={content.lightningFast.videoPoster}
                        onChange={(e) => updateContent('lightningFast.videoPoster', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Contact Section */}
              {activeTab === 'contact' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Contact Section</h2>
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                      <Input
                        value={content.contact.title}
                        onChange={(e) => updateContent('contact.title', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Highlighted Text</label>
                      <Input
                        value={content.contact.highlightedText}
                        onChange={(e) => updateContent('contact.highlightedText', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                      <Input
                        value={content.contact.subtitle}
                        onChange={(e) => updateContent('contact.subtitle', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
                      <Input
                        value={content.contact.buttonText}
                        onChange={(e) => updateContent('contact.buttonText', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Footer Section */}
              {activeTab === 'footer' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Footer</h2>
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Copyright Text</label>
                      <Input
                        value={content.footer.copyrightText}
                        onChange={(e) => updateContent('footer.copyrightText', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                      <Textarea
                        value={content.footer.address}
                        onChange={(e) => updateContent('footer.address', e.target.value)}
                        rows={2}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Legal Pages */}
              {activeTab === 'legal' && (
                <div className="space-y-8">
                  <h2 className="text-xl font-semibold">Legal Pages</h2>
                  
                  {/* Privacy Policy */}
                  <div className="border-b pb-6">
                    <h3 className="text-lg font-medium mb-4">Privacy Policy</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                        <Input
                          value={content.legal.privacy.title}
                          onChange={(e) => updateContent('legal.privacy.title', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Updated</label>
                        <Input
                          value={content.legal.privacy.lastUpdated}
                          onChange={(e) => updateContent('legal.privacy.lastUpdated', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                        <Textarea
                          value={content.legal.privacy.content}
                          onChange={(e) => updateContent('legal.privacy.content', e.target.value)}
                          rows={8}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Terms of Service */}
                  <div className="border-b pb-6">
                    <h3 className="text-lg font-medium mb-4">Terms of Service</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                        <Input
                          value={content.legal.terms.title}
                          onChange={(e) => updateContent('legal.terms.title', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Updated</label>
                        <Input
                          value={content.legal.terms.lastUpdated}
                          onChange={(e) => updateContent('legal.terms.lastUpdated', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                        <Textarea
                          value={content.legal.terms.content}
                          onChange={(e) => updateContent('legal.terms.content', e.target.value)}
                          rows={8}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Cookie Policy */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">Cookie Policy</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                        <Input
                          value={content.legal.cookies.title}
                          onChange={(e) => updateContent('legal.cookies.title', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Updated</label>
                        <Input
                          value={content.legal.cookies.lastUpdated}
                          onChange={(e) => updateContent('legal.cookies.lastUpdated', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                        <Textarea
                          value={content.legal.cookies.content}
                          onChange={(e) => updateContent('legal.cookies.content', e.target.value)}
                          rows={8}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
