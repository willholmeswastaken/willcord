import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthGate from './Auth/AuthGate';
import AuthProvider from './Auth/AuthProvider';
import SignIn from './Auth/SignIn';
import ServerList from './components/ServerList';
import Home from './components/Home';
import ServerView from './components/Server/ServerView';
import ChannelDisplay from './components/Server/Channel';

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
