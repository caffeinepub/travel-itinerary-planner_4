import { RouterProvider, createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { Toaster } from '@/components/ui/sonner';
import Layout from './components/Layout';
import Home from './pages/Home';
import ItineraryForm from './pages/ItineraryForm';
import ItineraryDetail from './pages/ItineraryDetail';

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Layout>
        <Outlet />
      </Layout>
      <Toaster richColors position="top-right" />
    </>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

const newItineraryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/itinerary/new',
  validateSearch: (search: Record<string, unknown>): { destination?: string } => ({
    destination: typeof search.destination === 'string' ? search.destination : undefined,
  }),
  component: ItineraryForm,
});

const editItineraryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/itinerary/$id/edit',
  component: ItineraryForm,
});

const itineraryDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/itinerary/$id',
  component: ItineraryDetail,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  newItineraryRoute,
  editItineraryRoute,
  itineraryDetailRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
