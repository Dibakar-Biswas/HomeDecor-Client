import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useRole from '../../hooks/useRole';
import useDemoAccount from '../../hooks/useDemoAccount';
import { toast } from 'react-toastify';

const Profile = () => {
  const { user, updateUserProfile } = useAuth();
  const { role } = useRole();
  const { isDemoAccount } = useDemoAccount();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || '');

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    // ✅ Block demo accounts
    if (isDemoAccount) {
      toast.warning(
        'Demo accounts cannot update profile. Please register for full access.',
        {
          position: 'top-right',
          autoClose: 3000,
        }
      );
      return;
    }

    // Validation
    if (!displayName.trim()) {
      toast.error('Name cannot be empty', {
        position: 'top-right',
        autoClose: 2000,
      });
      return;
    }

    if (displayName.length < 3) {
      toast.error('Name must be at least 3 characters long', {
        position: 'top-right',
        autoClose: 2000,
      });
      return;
    }

    setIsLoading(true);

    try {
      // Update Firebase profile
      await updateUserProfile({ displayName: displayName });

      toast.success('Profile updated successfully!', {
        position: 'top-right',
        autoClose: 2000,
      });

      setIsModalOpen(false);

      // Reload to reflect changes
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error('Update error:', error);
      toast.error('Failed to update profile. Please try again.', {
        position: 'top-right',
        autoClose: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = () => {
    if (isDemoAccount) {
      toast.warning(
        'Demo accounts cannot update profile. Please register for full access.',
        {
          position: 'top-right',
          autoClose: 3000,
        }
      );
      return;
    }
    setDisplayName(user?.displayName || '');
    setIsModalOpen(true);
  };

  return (
    <div className="flex justify-center items-center min-h-screen py-12 px-4 bg-base-100">
      {/* Demo Account Warning */}
      {isDemoAccount && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4">
          <div className="alert alert-warning shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span className="text-sm">Demo Account - Profile updates disabled</span>
          </div>
        </div>
      )}

      <div className="bg-base-200 shadow-xl rounded-2xl w-full md:w-4/5 lg:w-3/5 border border-base-300">
        <div className="flex flex-col items-center justify-center p-6 -mt-16">
          <div className="relative">
            <img
              alt="profile"
              src={user?.photoURL}
              referrerPolicy="no-referrer"
              className="mx-auto object-cover rounded-full h-32 w-32 border-4 border-primary shadow-lg"
            />
          </div>

          <span className="mt-4 px-6 py-2 text-sm font-bold text-white bg-primary rounded-full uppercase tracking-wider">
            {role}
          </span>

          <p className="mt-4 text-sm font-medium text-base-content/60">
            User ID: <span className="text-base-content/80 text-xs">{user?.uid}</span>
          </p>

          <div className="w-full p-6 mt-6 bg-base-100 rounded-lg border border-base-300">
            <div className="space-y-4">
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-base-content/70 mb-1">
                  Name
                </span>
                <span className="text-lg font-bold text-base-content">
                  {user?.displayName}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-sm font-semibold text-base-content/70 mb-1">
                  Email
                </span>
                <span className="text-lg font-bold text-base-content break-all">
                  {user?.email}
                </span>
              </div>

              <div className="pt-4">
                <button
                  onClick={openModal}
                  disabled={isDemoAccount}
                  className={`btn btn-primary w-full text-white ${
                    isDemoAccount ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isDemoAccount ? 'Demo - Cannot Update' : 'Update Profile'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Update Profile Modal */}
      {isModalOpen && (
        <dialog className="modal modal-open">
          <div className="modal-box bg-base-200 border border-base-300">
            <h3 className="font-bold text-2xl text-primary mb-6">
              Update Profile
            </h3>

            <form onSubmit={handleUpdateProfile}>
              <div className="space-y-4">
                {/* Display Name */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-base-content font-semibold">
                      Display Name
                    </span>
                  </label>
                  <input
                    type="text"
                    name="displayName"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Enter your name"
                    className="input input-bordered w-full bg-base-100 text-base-content"
                    required
                    minLength={3}
                    disabled={isLoading}
                  />
                </div>

                {/* Current Email (Read-only) */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-base-content font-semibold">
                      Email Address
                    </span>
                  </label>
                  <input
                    type="email"
                    value={user?.email}
                    className="input input-bordered w-full bg-base-300 text-base-content cursor-not-allowed"
                    disabled
                    readOnly
                  />
                  <label className="label">
                    <span className="label-text-alt text-base-content/60">
                      Email cannot be changed here
                    </span>
                  </label>
                </div>
              </div>

              <div className="modal-action">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn btn-ghost"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary text-white"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Updating...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>
            </form>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setIsModalOpen(false)}>close</button>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default Profile;
