import React, { useState } from 'react';
import { Briefcase, User, Mail, Lock, Eye, EyeOff, UserPlus, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage({ onNavigateLogin }) {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const validate = () => {
    const errors = {};
    if (!name.trim()) {
      errors.name = 'Full name is required';
    }

    if (!email.trim()) {
      errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (!confirmPassword) {
      errors.confirmPassword = 'Confirmation password is required';
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validate()) return;

    setLoading(true);
    try {
      await register(name.trim(), email.trim(), password);
      // Navigation to dashboard occurs automatically via AuthContext
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Registration failed. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5 d-flex align-items-center justify-content-center" style={{ minHeight: 'calc(100vh - 160px)' }}>
      <div className="row justify-content-center w-100">
        <div className="col-12 col-sm-10 col-md-8 col-lg-5">
          <div className="glass-card p-4 p-md-5">
            <div className="text-center mb-4">
              <div className="icon-wrapper icon-primary mx-auto mb-3" style={{ width: '52px', height: '52px' }}>
                <Briefcase size={26} className="text-indigo" />
              </div>
              <h2 className="fs-3 fw-bold text-white mb-1">Create an Account</h2>
              <p className="text-secondary small mb-0">Track your job applications and accelerate your career</p>
            </div>

            {error && (
              <div className="alert alert-danger bg-danger bg-opacity-10 border border-danger border-opacity-25 text-danger small d-flex align-items-center gap-2 p-3 mb-4 rounded-3" role="alert">
                <AlertCircle size={18} className="flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              {/* Full Name */}
              <div className="mb-3">
                <label className="form-label d-flex align-items-center gap-2" htmlFor="reg-name">
                  <User size={14} className="text-secondary" />
                  <span>Full Name</span>
                </label>
                <input
                  id="reg-name"
                  type="text"
                  className={`form-control ${fieldErrors.name ? 'is-invalid border-danger' : ''}`}
                  placeholder="e.g. Alex Taylor"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (fieldErrors.name) setFieldErrors({ ...fieldErrors, name: '' });
                  }}
                  disabled={loading}
                  autoComplete="name"
                  required
                />
                {fieldErrors.name && (
                  <div className="text-danger small mt-1">{fieldErrors.name}</div>
                )}
              </div>

              {/* Email Address */}
              <div className="mb-3">
                <label className="form-label d-flex align-items-center gap-2" htmlFor="reg-email">
                  <Mail size={14} className="text-secondary" />
                  <span>Email Address</span>
                </label>
                <input
                  id="reg-email"
                  type="email"
                  className={`form-control ${fieldErrors.email ? 'is-invalid border-danger' : ''}`}
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: '' });
                  }}
                  disabled={loading}
                  autoComplete="email"
                  required
                />
                {fieldErrors.email && (
                  <div className="text-danger small mt-1">{fieldErrors.email}</div>
                )}
              </div>

              {/* Password */}
              <div className="mb-3">
                <label className="form-label d-flex align-items-center gap-2" htmlFor="reg-password">
                  <Lock size={14} className="text-secondary" />
                  <span>Password</span>
                </label>
                <div className="position-relative">
                  <input
                    id="reg-password"
                    type={showPassword ? 'text' : 'password'}
                    className={`form-control pe-5 ${fieldErrors.password ? 'is-invalid border-danger' : ''}`}
                    placeholder="At least 6 characters"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (fieldErrors.password) setFieldErrors({ ...fieldErrors, password: '' });
                    }}
                    disabled={loading}
                    autoComplete="new-password"
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-link position-absolute end-0 top-50 translate-middle-y text-secondary p-2 me-1"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex="-1"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {fieldErrors.password && (
                  <div className="text-danger small mt-1">{fieldErrors.password}</div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="mb-4">
                <label className="form-label d-flex align-items-center gap-2" htmlFor="reg-confirm-password">
                  <Lock size={14} className="text-secondary" />
                  <span>Confirm Password</span>
                </label>
                <input
                  id="reg-confirm-password"
                  type={showPassword ? 'text' : 'password'}
                  className={`form-control ${fieldErrors.confirmPassword ? 'is-invalid border-danger' : ''}`}
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (fieldErrors.confirmPassword) setFieldErrors({ ...fieldErrors, confirmPassword: '' });
                  }}
                  disabled={loading}
                  autoComplete="new-password"
                  required
                />
                {fieldErrors.confirmPassword && (
                  <div className="text-danger small mt-1">{fieldErrors.confirmPassword}</div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                id="btn-register-submit"
                className="btn btn-primary-gradient w-100 py-2 d-flex align-items-center justify-content-center gap-2 fs-6 mb-3"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    <span>Creating account...</span>
                  </>
                ) : (
                  <>
                    <UserPlus size={18} />
                    <span>Create Account</span>
                  </>
                )}
              </button>
            </form>

            <div className="text-center pt-3 border-top border-secondary border-opacity-10">
              <span className="text-secondary small">Already have an account? </span>
              <button
                type="button"
                className="btn btn-link text-primary-accent p-0 small fw-semibold text-decoration-none"
                onClick={onNavigateLogin}
                id="link-go-to-login"
              >
                Sign in here
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
