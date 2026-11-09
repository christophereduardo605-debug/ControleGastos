import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import ListaGastos from "./src/telas/ListaGastos";
import AdicionarGasto from "./src/telas/AdicionarGasto";

const Stack = createNativeStackNavigator();

export default function App() {
  const [gastos, setGastos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    carregarGastos();
  }, []);

  async function carregarGastos() {
    try {
      const dados = await AsyncStorage.getItem("meusGastos");

      if (dados !== null) {
        setGastos(JSON.parse(dados));
      }
    } catch (erro) {
      console.log("Erro ao carregar gastos:", erro);
    } finally {
      setCarregando(false);
    }
  }

  async function atualizarGastos(novaLista) {
    try {
      await AsyncStorage.setItem("meusGastos", JSON.stringify(novaLista));

      setGastos(novaLista);
    } catch (erro) {
      console.log("Erro ao salvar gastos:", erro);
    }
  }

  if (carregando) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Meus Gastos"
          options={{ title: "Controle de Gastos" }}
        >
          {(props) => (
            <ListaGastos
              {...props}
              gastos={gastos}
              setGastos={atualizarGastos}
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="Adicionar Gasto" options={{ title: "Novo Gasto" }}>
          {(props) => (
            <AdicionarGasto
              {...props}
              gastos={gastos}
              setGastos={atualizarGastos}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
