import { QueryClient, QueryClientProvider, useMutation } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthGate from './Auth/AuthGate';
import AuthProvider, { AuthContext } from './Auth/AuthProvider';
import SignIn from './Auth/SignIn';
import ServerList from './components/ServerList';
import Home from './components/Home';
import ServerView from './components/Server/ServerView';
import ChannelDisplay from './components/Server/Channel';
import supabaseClient from './supabaseClient';
import { useContext, useEffect } from 'react';
import { WillcordUser } from './types/User';

import './App.css';

export const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/signin"
              element={
                <AuthGate required={false}>
                  <SignIn />
                </AuthGate>
              }
            />
            <Route
              path="/*"
              element={
                <AuthGate required>
                  <SignedIn />
                </AuthGate>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  )
}

function SignedIn() {
  const user = useContext(AuthContext);
  const updateUserMutation = useMutation(
    async () => {
      // todo: proper error handling
      const { data, error } = await supabaseClient
        .from<WillcordUser>("User")
        .upsert([{ id: user!.id, username: user!.user_metadata.full_name, user_image: user!.user_metadata.picture, last_seen: new Date() }]);
      return data;
    },
    {
      onSuccess: () => queryClient.invalidateQueries(['server-users', "messages"]),
    }
  );

  useEffect(() => {
    updateUserMutation.mutate();
  }, []);

  return (
    <div className="flex">
      <ServerList />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path=":server" element={<ServerView />}>
          {/* <Route index element={<Navigate to={`/${lastSeenChannel}`} />} /> */}
          <Route path=":channel" element={<ChannelDisplay />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App
