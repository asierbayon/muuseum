export type AuthUser = null | Record<string, any>;

export type AuthContextType = {
  currentUser: AuthUser;
  isAuthenticated: VoidFunction;
  onUserChange: (currentUser: AuthUser) => void;
};
