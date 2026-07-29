'use client';

import { useState, useEffect, useRef } from 'react';
import { Share2, Copy, Check, Link2, X } from 'lucide-react';
import toast from 'react-hot-toast';
import styles from './ShareButtons.module.css';

export default function ShareButtons({ title = '', locale = 'bn', variant = 'compact' }) {
  const [copied, setCopied] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');
  const menuRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }
  }, []);

  // Close dropdown menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu]);

  const getUrl = () => {
    if (typeof window !== 'undefined') {
      return window.location.href;
    }
    return currentUrl;
  };

  const handleCopyLink = async (e) => {
    if (e) e.stopPropagation();
    const urlToCopy = getUrl();
    
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(urlToCopy);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = urlToCopy;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      toast.success(locale === 'bn' ? 'লিংক কপি করা হয়েছে!' : 'Link copied to clipboard!');
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy: ', err);
      toast.error(locale === 'bn' ? 'কপি করতে সমস্যা হয়েছে' : 'Failed to copy link');
    }
  };

  const handleShareClick = async () => {
    const url = getUrl();
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: url,
        });
        return;
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Share error:', err);
        }
      }
    }
    setShowMenu((prev) => !prev);
  };

  const openSocialShare = (platform) => {
    const url = encodeURIComponent(getUrl());
    const encodedTitle = encodeURIComponent(title);
    let shareUrl = '';

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${encodedTitle}%20${url}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${encodedTitle}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
      default:
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'noopener,noreferrer,width=600,height=500');
    }
    setShowMenu(false);
  };

  if (variant === 'full') {
    return (
      <div className={styles.fullShareContainer}>
        <span className={styles.shareLabel}>
          {locale === 'bn' ? 'সংবাদটি শেয়ার করুন:' : 'Share this news:'}
        </span>
        <div className={styles.socialButtonsGroup}>
          <button 
            className={`${styles.iconBtn} ${styles.copyBtn} ${copied ? styles.copied : ''}`}
            onClick={handleCopyLink}
            title={locale === 'bn' ? 'লিংক কপি করুন' : 'Copy link'}
            type="button"
          >
            {copied ? <Check size={18} /> : <Copy size={18} />}
            <span className={styles.btnText}>
              {copied 
                ? (locale === 'bn' ? 'কপি করা হয়েছে' : 'Copied!') 
                : (locale === 'bn' ? 'লিংক কপি' : 'Copy Link')}
            </span>
          </button>

          <button 
            className={`${styles.iconBtn} ${styles.facebookBtn}`}
            onClick={() => openSocialShare('facebook')}
            title="Share on Facebook"
            type="button"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <span className={styles.btnText}>Facebook</span>
          </button>

          <button 
            className={`${styles.iconBtn} ${styles.whatsappBtn}`}
            onClick={() => openSocialShare('whatsapp')}
            title="Share on WhatsApp"
            type="button"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M17.472 14.382c-.301-.15-1.776-.876-2.053-.976-.277-.1-.479-.15-.68.15-.202.3-.78 1.002-.958 1.202-.178.201-.355.226-.656.075-.301-.15-1.272-.469-2.424-1.496-.897-.8-1.502-1.787-1.678-2.088-.178-.301-.019-.464.131-.614.136-.135.301-.355.451-.532.15-.178.201-.301.301-.502.1-.201.05-.376-.025-.526-.075-.15-.68-1.637-.931-2.242-.244-.588-.493-.509-.68-.519-.174-.01-.375-.01-.576-.01-.201 0-.526.075-.802.376-.276.3-.1.053-1.077 1.053-1.077 1.053 1.077 2.457 1.157 3.332 2.355 4.095 3.013 4.298 3.737 4.887.525.753.864 1.378.864 1.83 0 .452-.06 1.403-.68 1.956-.62.552-1.328.802-2.106.802a4.42 4.42 0 0 1-.652-.05zM12.004 0C5.373 0 0 5.373 0 12c0 2.118.552 4.108 1.517 5.84L.073 23.364l5.688-1.492A11.953 11.953 0 0 0 12.004 24c6.627 0 12-5.373 12-12s-5.373-12-12-12z"/>
            </svg>
            <span className={styles.btnText}>WhatsApp</span>
          </button>

          <button 
            className={`${styles.iconBtn} ${styles.twitterBtn}`}
            onClick={() => openSocialShare('twitter')}
            title="Share on X"
            type="button"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            <span className={styles.btnText}>X</span>
          </button>
        </div>
      </div>
    );
  }

  // Compact variant (default)
  return (
    <div className={styles.shareWrapper} ref={menuRef}>
      <div className={styles.actionButtons}>
        {/* Direct Copy Link Button */}
        <button 
          className={`${styles.shareButton} ${copied ? styles.copiedState : ''}`}
          onClick={handleCopyLink}
          aria-label={locale === 'bn' ? 'লিংক কপি করুন' : 'Copy link'}
          title={copied ? (locale === 'bn' ? 'কপি করা হয়েছে' : 'Copied!') : (locale === 'bn' ? 'লিংক কপি করুন' : 'Copy link')}
          type="button"
        >
          {copied ? <Check size={18} color="#16a34a" /> : <Link2 size={18} />}
        </button>

        {/* Share Menu Toggle Button */}
        <button 
          className={`${styles.shareButton} ${showMenu ? styles.activeMenu : ''}`}
          onClick={handleShareClick}
          aria-label="Share options"
          title={locale === 'bn' ? 'শেয়ার করুন' : 'Share options'}
          type="button"
        >
          <Share2 size={18} />
        </button>
      </div>

      {/* Social Popup Menu */}
      {showMenu && (
        <div className={styles.dropdownMenu}>
          <div className={styles.menuHeader}>
            <span>{locale === 'bn' ? 'শেয়ার মাধ্যম' : 'Share to'}</span>
            <button className={styles.closeBtn} onClick={() => setShowMenu(false)}>
              <X size={14} />
            </button>
          </div>

          <div className={styles.menuItems}>
            <button className={styles.menuItem} onClick={handleCopyLink}>
              <div className={styles.menuIconCircle} style={{ background: '#f3f4f6', color: '#111827' }}>
                {copied ? <Check size={16} color="#16a34a" /> : <Copy size={16} />}
              </div>
              <span>{copied ? (locale === 'bn' ? 'কপি হয়েছে' : 'Copied!') : (locale === 'bn' ? 'লিংক কপি' : 'Copy Link')}</span>
            </button>

            <button className={styles.menuItem} onClick={() => openSocialShare('facebook')}>
              <div className={styles.menuIconCircle} style={{ background: '#1877f2', color: '#fff' }}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </div>
              <span>Facebook</span>
            </button>

            <button className={styles.menuItem} onClick={() => openSocialShare('whatsapp')}>
              <div className={styles.menuIconCircle} style={{ background: '#25d366', color: '#fff' }}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M17.472 14.382c-.301-.15-1.776-.876-2.053-.976-.277-.1-.479-.15-.68.15-.202.3-.78 1.002-.958 1.202-.178.201-.355.226-.656.075-.301-.15-1.272-.469-2.424-1.496-.897-.8-1.502-1.787-1.678-2.088-.178-.301-.019-.464.131-.614.136-.135.301-.355.451-.532.15-.178.201-.301.301-.502.1-.201.05-.376-.025-.526-.075-.15-.68-1.637-.931-2.242-.244-.588-.493-.509-.68-.519-.174-.01-.375-.01-.576-.01-.201 0-.526.075-.802.376-.276.3-.1.053-1.077 1.053-1.077 1.053 1.077 2.457 1.157 3.332 2.355 4.095 3.013 4.298 3.737 4.887.525.753.864 1.378.864 1.83 0 .452-.06 1.403-.68 1.956-.62.552-1.328.802-2.106.802a4.42 4.42 0 0 1-.652-.05zM12.004 0C5.373 0 0 5.373 0 12c0 2.118.552 4.108 1.517 5.84L.073 23.364l5.688-1.492A11.953 11.953 0 0 0 12.004 24c6.627 0 12-5.373 12-12s-5.373-12-12-12z"/>
                </svg>
              </div>
              <span>WhatsApp</span>
            </button>

            <button className={styles.menuItem} onClick={() => openSocialShare('twitter')}>
              <div className={styles.menuIconCircle} style={{ background: '#000', color: '#fff' }}>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </div>
              <span>X (Twitter)</span>
            </button>

            <button className={styles.menuItem} onClick={() => openSocialShare('linkedin')}>
              <div className={styles.menuIconCircle} style={{ background: '#0a66c2', color: '#fff' }}>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.64a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2z"/>
                </svg>
              </div>
              <span>LinkedIn</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
