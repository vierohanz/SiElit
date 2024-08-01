// ProfileContext.tsx
import React, {createContext, useState, ReactNode} from 'react';

interface ProfileContextType {
  profileImage: string;
  setProfileImage: (image: string) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{children: ReactNode}> = ({
  children,
}) => {
  const [profileImage, setProfileImage] = useState<string>(
    require('../assets/images/profile.jpg'),
  ); // Gambar default

  return (
    <ProfileContext.Provider value={{profileImage, setProfileImage}}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = React.useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};
