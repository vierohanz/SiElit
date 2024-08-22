import React, {createContext, useContext, useState, ReactNode} from 'react';

interface ProfileContextType {
  selectedAvatar: string | null;
  setSelectedAvatar: (avatar: string | null) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{children: ReactNode}> = ({
  children,
}) => {
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);

  return (
    <ProfileContext.Provider value={{selectedAvatar, setSelectedAvatar}}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};
