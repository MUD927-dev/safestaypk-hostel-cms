'use client';

import { useState } from 'react';
import Image from 'next/image';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
}

type Role = 'Student' | 'Parent/Guardian' | 'Hostel Owner' | 'Owner';

export default function AuthModal({ isOpen, onClose, initialMode = 'login' }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [role, setRole] = useState<Role>('Student');

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="auth-modal__close" onClick={onClose} aria-label="Close modal">
          ×
        </button>
        
        {/* Left Side: Form */}
        <div className="auth-modal__form-side">
          <div className="auth-modal__header">
            <div className="auth-modal__brand">
              <div className="auth-modal__logo">
                {/* Shield Icon SVG */}
                <svg width="18" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
              </div>
              <h2>SafeStayPK</h2>
            </div>
            <p className="auth-modal__subtitle">Secure accommodation platform for students</p>
          </div>

          <div className="auth-form-group">
            <label className="auth-label">Select Your Role</label>
            <div className="auth-select-wrapper">
              <select 
                className="auth-select" 
                value={role} 
                onChange={(e) => setRole(e.target.value as Role)}
              >
                <option value="Student">Student</option>
                <option value="Parent/Guardian">Parent/Guardian</option>
                <option value="Hostel Owner">Hostel Owner</option>
                <option value="Owner">Owner</option>
              </select>
            </div>
          </div>

          <div className="auth-tabs">
            <button 
              className={`auth-tab ${isLogin ? 'active' : ''}`} 
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button 
              className={`auth-tab ${!isLogin ? 'active' : ''}`} 
              onClick={() => setIsLogin(false)}
            >
              Register
            </button>
          </div>

          <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
            <div className="auth-form-group">
              <label className="auth-label">Email Address</label>
              <div className="auth-input-wrapper">
                <svg className="auth-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <input type="email" className="auth-input" placeholder="Enter your email" required />
              </div>
            </div>

            <div className="auth-form-group">
              <label className="auth-label">Password</label>
              <div className="auth-input-wrapper">
                <svg className="auth-input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <input type="password" className="auth-input" placeholder="Enter your password" required />
              </div>
            </div>

            {isLogin && (
              <div className="auth-form-options">
                <label className="auth-checkbox">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>
                <a href="#" className="auth-forgot-link">Forgot Password?</a>
              </div>
            )}

            {!isLogin && (
              <div className="auth-form-options">
                <label className="auth-checkbox">
                  <input type="checkbox" required />
                  <span>I agree to the Terms & Conditions</span>
                </label>
              </div>
            )}

            <button type="submit" className="auth-submit-btn">
              {isLogin ? 'Sign In' : 'Sign Up'}
            </button>
          </form>

          <div className="auth-divider">
            <span>Or continue with</span>
          </div>

          <div className="auth-socials">
            <button className="auth-social-btn">
              <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                  <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                  <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                  <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                  <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
                </g>
              </svg>
              <span>Google</span>
            </button>
            <button className="auth-social-btn">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>Facebook</span>
            </button>
          </div>
        </div>

        {/* Right Side: Informational */}
        <div className="auth-modal__info-side">
          {/* Decorative shapes */}
          <div className="auth-modal__shape auth-modal__shape--1"></div>
          <div className="auth-modal__shape auth-modal__shape--2"></div>
          <div className="auth-modal__shape auth-modal__shape--3"></div>
          
          <div className="auth-info-content">
            <div className="auth-illustration">
              <Image 
                src="/images/hostel_illustration.png" 
                alt="Modern Hostel Accommodation" 
                width={300} 
                height={300}
                style={{ objectFit: 'contain' }}
              />
            </div>
            
            <h3 className="auth-info-title">Welcome to SafeStayPK</h3>
            <p className="auth-info-desc">
              Find secure and verified accommodation for students across Pakistan. Connect with trusted property owners and guardians.
            </p>
            
            <div className="auth-stats">
              <div className="auth-stat">
                <span className="auth-stat-val">500+</span>
                <span className="auth-stat-label">Verified Properties</span>
              </div>
              <div className="auth-stat">
                <span className="auth-stat-val">1000+</span>
                <span className="auth-stat-label">Happy Students</span>
              </div>
              <div className="auth-stat">
                <span className="auth-stat-val">50+</span>
                <span className="auth-stat-label">Cities Covered</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
