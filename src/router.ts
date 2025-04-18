import {
  createRootRouteWithContext,
  createRoute,
  redirect,
} from "@tanstack/react-router";
import { QueryClient } from "@tanstack/react-query";
import { TracksList } from "@/pages/TracksList";
import { CreateTrackModal } from "@/modals/CreateTrackModal";
import { EditTrackModal } from "@/modals/EditTrackModal";
import { NotFound } from "@/NotFound";

import App from "@/App.tsx";

const rootRoute = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: App,
  notFoundComponent: NotFound,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  beforeLoad: () => {
    return redirect({ to: "/tracks", throw: true });
  },
});

const tracksRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/tracks",
  component: TracksList,
});

const createTrackRoute = createRoute({
  getParentRoute: () => tracksRoute,
  path: "/create",
  component: CreateTrackModal,
});

const editTrackRoute = createRoute({
  getParentRoute: () => tracksRoute,
  path: "/edit/$trackId",
  component: EditTrackModal,
});

export const routeTree = rootRoute.addChildren([
  indexRoute,
  tracksRoute.addChildren([createTrackRoute, editTrackRoute]),
]);
