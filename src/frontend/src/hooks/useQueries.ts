import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { SiteConfig } from "../backend.d";
import { useActor } from "./useActor";

export function useGetConfig() {
  const { actor, isFetching } = useActor();
  return useQuery<SiteConfig>({
    queryKey: ["config"],
    queryFn: async () => {
      if (!actor) {
        return {
          inviteCode: "13814651728",
          registrationLink:
            "https://www.aajclub.com/#/register?invitationCode=13814651728",
        };
      }
      return actor.getConfig();
    },
    enabled: !isFetching,
    staleTime: 1000 * 60 * 5,
  });
}

export function useIncrementVisitorCount() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) return BigInt(0);
      return actor.incrementVisitorCount();
    },
    onSuccess: (data) => {
      if (data !== undefined && data !== null) {
        queryClient.setQueryData(["visitorCount"], data);
      }
    },
  });
}

export function useVisitorCount() {
  return useQuery<bigint>({
    queryKey: ["visitorCount"],
    queryFn: () => BigInt(0),
    enabled: false,
    staleTime: Number.POSITIVE_INFINITY,
  });
}
