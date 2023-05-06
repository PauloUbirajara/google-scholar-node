import { Button, Stack, Textarea } from "@chakra-ui/react";
import { useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";

import { UpdateService } from "@renderer/services/update.service";
import LocalFetchUserService from "@renderer/services/fetch.service";
import BaseTemplate from "@renderer/templates/base.template";
import { useNavigate } from "react-router-dom";

function ProcessPage() {
  const usersRef = useRef<HTMLTextAreaElement>(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate()

  const fetchUsers = () => {
    query.refetch();
  };

  // const fetchUsersWithUseQueries = () => {
  //   try {
  //     // if (!usersRef.current) {
  //     //   throw new Error("TextArea ref not updated");
  //     // }

  //     // const usersTextarea = usersRef.current.value;
  //     // const users = usersTextarea
  //     //   .split("\n")
  //     //   .map((val) => val.trim())
  //     //   .filter((val) => Boolean(val));

  //     const users = [
  //       "https://scholar.google.com.br/citations?user=2AsIb8MAAAAJ&hl=pt-BR&oi=ao",
  //       "https://scholar.google.com.br/citations?user=TB4cLXEAAAAJ&hl=pt-BR"
  //     ];

  //     if (!users.length) {
  //       throw new Error("No users");
  //     }

  //     return users.map((u, i) => ({
  //       queryKey: ["user", `user-${i}`],
  //       queryFn: () => LocalFetchUserService.fetchUserHTML(u)
  //     }));
  //   } catch (e) {
  //     queryClient.invalidateQueries({
  //       queryKey: ["users"]
  //     });
  //     return [];
  //   }
  // };

  const fetchUsersWithUseQuery = () => {
    if (!usersRef.current) {
      return Promise.reject("TextArea not changed");
    }

    const usersTextarea = usersRef.current.value;
    const users = usersTextarea
      .split("\n")
      .map((val) => val.trim())
      .filter((val) => Boolean(val));

    if (!users.length) {
      return Promise.reject("No users");
    }

    return Promise.all(
      users.map((u) => LocalFetchUserService.fetchUserHTML(u))
    );
  };

  // TODO useQueries
  // const query = useQueries({
  //   queries: fetchUsers()
  // });

  const query = useQuery({
    queryFn: fetchUsersWithUseQuery,
    queryKey: ["users"],
    enabled: false,
    retry: true
  });

  const checkForUpdates = () => {
    UpdateService.getReleases().then(console.log).catch(console.warn);
  };

  const goHome = () => {
    navigate('/')
  }

  return (
    <BaseTemplate title="Processar planilha">
      <Stack>
        <Textarea ref={usersRef}></Textarea>
        {/* 
      TODO with useQueries
      {query.map((d, i) => {
        return (
          <Skeleton key={i} isLoaded={d.isFetched}>
            <Code>
              {i}) {d.data?.slice(0, 50)}
            </Code>
          </Skeleton>
        );
      })} */}

        {/* <Skeleton isLoaded={query.isFetched}>
          {query.data?.map((d, i) => {
            return (
              <Code key={i}>
                {i}) {d.slice(0, 50)}
              </Code>
            );
          })}
        </Skeleton> */}
        <Button onClick={fetchUsers}>Fetch Users</Button>
        <Button onClick={checkForUpdates}>Check for updates</Button>
        <Button onClick={goHome}>Voltar ao início</Button>
      </Stack>
    </BaseTemplate>
  );
}

export default ProcessPage;
