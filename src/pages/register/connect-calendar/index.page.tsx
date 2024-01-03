import { Button, Heading, MultiStep, Text, TextInput } from "@ignite-ui/react";
import { Container, Header } from "../styles";
import { ArrowRight, Check } from "phosphor-react";

import { api } from "@/src/lib/axios";
import { AuthError, ConnectBox, ConnectItem } from "./styles";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function handleConnectCalendar() {
  const session = useSession();
  const router = useRouter();

  const hasAuthError = !!router.query.error;
  const isSignedIn = session.status === "authenticated";

  async function handleConnectCalendar() {
    await signIn("google");
  }

  return (
    <Container>
      <Header>
        <Heading as="strong">Conecte sua agenda:</Heading>
        <Text>
          Conecte o seu calendário para verificar automaticamente as horas
          ocupadas e os novos eventos a medida emq eu são agendados.
        </Text>
        <MultiStep size={4} currentStep={2} />
        <ConnectBox>
          <ConnectItem>
            <Text>Google Calendar</Text>
            {isSignedIn ? (
              <Button size="sm" disabled>
                Conectado
                <Check />
              </Button>
            ) : (
              <Button
                variant="secondary"
                size="sm"
                onClick={handleConnectCalendar}
              >
                Conectar
                <ArrowRight />
              </Button>
            )}
          </ConnectItem>

          {hasAuthError && (
            <AuthError size="sm">
              Falha ao se conectart ao Google. Verifique se você habilitou as
              permissões de acesso ao Google Calendar
            </AuthError>
          )}

          {/* <Text>{JSON.stringify(session.data)}</Text> */}
          <Button type="submit" disabled={!isSignedIn}>
            Próximo Passo
            <ArrowRight />
          </Button>
        </ConnectBox>
      </Header>
    </Container>
  );
}
