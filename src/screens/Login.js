import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  TextInput,
  TouchableHighlight,
  Alert,
  AsyncStorage,
} from "react-native";
import styles from "../styles";
import {
  handleAndroidBackButton,
  removeAndroidBackButtonHandler,
} from "../components/androidBackButton";
import axios from "axios";
import { useHistory } from "react-router-native";

const Login = () => {
  const [cedula, setCedula] = useState("");
  const [correo, setCorreo] = useState("");
  const [nombre, setNombre] = useState("");
  const [avatar, setAvatar] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [facultad, setFacultad] = useState("Facultad de Ingeniería");
  const [programa, setPrograma] = useState("Otro");

  const [ErrorCorreo, setErrorCorreo] = useState(false);
  const [loading, setLoading] = useState(false);

  const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,6}$/;

  const history = useHistory();

  useEffect(() => {
    handleAndroidBackButton(() => history.push("/"));
    return () => removeAndroidBackButtonHandler();
  }, []);

  const Validacion = () => {
    if (!correo.match(pattern)) {
      setErrorCorreo(true);
    } else {
      setErrorCorreo(false);
      PostData();
    }
  };

  const PostData = async () => {
    setLoading(true);

    await axios
      .post("http:/192.168.1.17:8000/students/login", {
        email: correo.toLowerCase(),
        contrasenia: contraseña,
      })
      .then((response) => {
        const data = response.data;

        console.log(data);

        if (!data.ingreso) {
          Alert.alert(
            "Error",
            "El correo o la contraseña es incorrecto.",
            [
              {
                text: "Aceptar",
                onPress: () => {},
              },
            ],
            { cancelable: false }
          );
        } else {
          AsyncStorage.setItem("usertoken", JSON.stringify(data));
          history.push("/Weeks");
          return data;
        }
      })
      .catch((err) => {
        console.log(err);
        Alert.alert(
          "Error",
          "Ocurrió un error al iniciar sesión por favor intenta mas tarde.",
          [
            {
              text: "Aceptar",
              onPress: () => {},
            },
          ],
          { cancelable: false }
        );
      });

    setLoading(false);
  };

  return (
    <View style={styles.containerLoginRegister}>
      <Text style={styles.text_Header}>Iniciar sesión</Text>
      {ErrorCorreo ? (
        <Text style={styles.textError}>
          Ingresa un correo electrónico valido
        </Text>
      ) : null}
      <TextInput
        style={styles.inputText}
        onChangeText={(text) => setCorreo(text)}
        value={correo}
        placeholder="Correo"
        maxLength={200}
      />
      <TextInput
        style={styles.inputText}
        onChangeText={(text) => setContraseña(text)}
        value={contraseña}
        secureTextEntry={true}
        placeholder="Contraseña"
        maxLength={200}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#32CF5E" />
      ) : (
        <View style={styles.contenedorBotonRegistro}>
          <TouchableHighlight
            underlayColor="#32CF5E"
            style={styles.buttonRegistro}
            onPress={() => {
              Validacion();
            }}
          >
            <Text style={styles.textbuttonRegistro}>Iniciar sesión</Text>
          </TouchableHighlight>
        </View>
      )}

      <TouchableHighlight
        underlayColor="rgba(0,0,0,0.0)"
        onPress={() => history.push("/")}
      >
        <Text style={styles.iniciarLink}>Registrarse</Text>
      </TouchableHighlight>
    </View>
  );
};

export default Login;
