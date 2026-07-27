'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';

export default function PostEditor() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get('id');

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(!!editId);
  const [uploadingImage, setUploadingImage] = useState(false);
  
  const [formData, setFormData] = useState({
    title: { bn: '', en: '' },
    content: { bn: '', en: '' },
    excerpt: { bn: '', en: '' },
    category: 'national',
    section: 'latest',
    imageUrl: '',
    slug: ''
  });

  useEffect(() => {
    if (editId) {
      fetch(`/api/articles/${editId}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) setFormData(data.data);
          setFetching(false);
        });
    }
  }, [editId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [field, lang] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [field]: { ...prev[field], [lang]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const dataForm = new FormData();
    dataForm.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: dataForm
      });
      const data = await res.json();
      if (data.success) {
        setFormData(prev => ({ ...prev, imageUrl: data.url }));
        toast.success('Image uploaded successfully');
      } else {
        toast.error('Upload failed: ' + data.error);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to upload image.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const url = editId ? `/api/articles/${editId}` : '/api/articles';
    const method = editId ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        toast.success(editId ? 'Article updated successfully!' : 'Article created successfully!');
        router.push('/admin');
      } else {
        toast.error('Error: ' + data.error);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to save article.');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div>Loading article data...</div>;

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', background: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>
        {editId ? 'Edit Article' : 'Create New Article'}
      </h1>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* Bilingual Fields */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          {/* Bangla Side */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--primary)' }}>বাংলা (Bangla)</h3>
            <div>
              <label>Title (BN)</label>
              <input type="text" name="title.bn" value={formData.title.bn} onChange={handleChange} required style={inputStyle} />
            </div>
            <div>
              <label>Excerpt (BN)</label>
              <textarea name="excerpt.bn" value={formData.excerpt.bn} onChange={handleChange} required rows={3} style={inputStyle} />
            </div>
            <div>
              <label>Content (BN)</label>
              <textarea name="content.bn" value={formData.content.bn} onChange={handleChange} required rows={8} style={inputStyle} />
            </div>
          </div>

          {/* English Side */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--primary)' }}>English</h3>
            <div>
              <label>Title (EN)</label>
              <input type="text" name="title.en" value={formData.title.en} onChange={handleChange} required style={inputStyle} />
            </div>
            <div>
              <label>Excerpt (EN)</label>
              <textarea name="excerpt.en" value={formData.excerpt.en} onChange={handleChange} required rows={3} style={inputStyle} />
            </div>
            <div>
              <label>Content (EN)</label>
              <textarea name="content.en" value={formData.content.en} onChange={handleChange} required rows={8} style={inputStyle} />
            </div>
          </div>
        </div>

        {/* Global Fields */}
        <div style={{ borderTop: '1px solid #eee', paddingTop: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <label>Category</label>
            <select name="category" value={formData.category} onChange={handleChange} style={inputStyle}>
              <option value="national">National (জাতীয়)</option>
              <option value="politics">Politics (রাজনীতি)</option>
              <option value="international">International (আন্তর্জাতিক)</option>
              <option value="economy">Economy (অর্থনীতি)</option>
              <option value="sports">Sports (খেলাধুলা)</option>
              <option value="entertainment">Entertainment (বিনোদন)</option>
            </select>
          </div>
          <div>
            <label>Section</label>
            <select name="section" value={formData.section} onChange={handleChange} style={inputStyle}>
              <option value="latest">Latest (সর্বশেষ)</option>
              <option value="featured">Featured (প্রধান খবর)</option>
              <option value="trending">Trending (ট্রেন্ডিং)</option>
            </select>
          </div>
          <div>
            <label>Image Upload / URL</label>
            <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
              <input type="file" accept="image/*" onChange={handleImageUpload} style={{ ...inputStyle, marginTop: 0, flex: 1, cursor: 'pointer' }} disabled={uploadingImage} />
              <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} required style={{ ...inputStyle, marginTop: 0, flex: 1 }} placeholder="https://... or upload a file" />
            </div>
            {uploadingImage && <small style={{ color: 'var(--primary)', display: 'block', marginTop: '5px' }}>Uploading image...</small>}
            {formData.imageUrl && formData.imageUrl.startsWith('/uploads/') && <small style={{ color: 'green', display: 'block', marginTop: '5px' }}>✓ Image uploaded successfully</small>}
          </div>
          <div>
            <label>Custom Slug (Optional)</label>
            <input type="text" name="slug" value={formData.slug} onChange={handleChange} style={inputStyle} placeholder="leave empty to auto-generate" />
          </div>
        </div>

        <button type="submit" disabled={loading} style={{
          background: 'var(--primary)', color: 'white', padding: '12px', borderRadius: '6px', fontSize: '16px', fontWeight: 'bold', border: 'none', cursor: 'pointer', marginTop: '10px'
        }}>
          {loading ? 'Saving...' : (editId ? 'Update Article' : 'Publish Article')}
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '10px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  marginTop: '5px',
  fontFamily: 'inherit'
};
