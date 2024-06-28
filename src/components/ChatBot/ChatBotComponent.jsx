import React, { useState } from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import { Link } from "react-router-dom";
import "./ChatBotComponent.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot, faXmark } from "@fortawesome/free-solid-svg-icons";

const DiseñoChat = {
  background: "#f5f8fb",
  fontFamily: "Arial, sans-serif",
  headerBgColor: "#00bcd4",
  headerFontColor: "#fff",
  headerFontSize: "15px",
  botBubbleColor: "#00bcd4",
  botFontColor: "#fff",
  userBubbleColor: "#fff",
  userFontColor: "#4a4a4a",
};

const ChatBotComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const validarNombre = (value) => {
    if (value.length > 15) {
      return "El nombre debe tener máximo 15 caracteres.";
    }

    if (/\d/.test(value)) {
      return "El nombre no puede contener números.";
    }

    if (value.charAt(0) !== value.charAt(0).toUpperCase()) {
      return "El nombre debe comenzar con mayúscula.";
    }

    return true;
  };

  return (
    <div>
      <button
        className="chatbot-toggle-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <>
            <FontAwesomeIcon icon={faXmark} />
          </>
        ) : (
          <>
            <FontAwesomeIcon icon={faRobot} />
          </>
        )}
      </button>

      {isOpen && (
        <div className="chatbot-container">
          <ThemeProvider theme={DiseñoChat}>
            <ChatBot
              steps={[
                {
                  id: "intro",
                  message: "Bienvenido a Tegobi's ChatBot. ¿Cómo te llamas?",
                  trigger: "nombre",
                },
                {
                  id: "nombre",
                  user: true,
                  validator: validarNombre,
                  trigger: "saludo",
                },
                {
                  id: "saludo",
                  message: "Encantado de conocerte, {previousValue}.",
                  trigger: "necesidad",
                },
                {
                  id: "necesidad",
                  message: "¿En qué puedo ayudarte hoy?",
                  trigger: "opciones",
                },
                {
                  id: "opciones",
                  options: [
                    {
                      value: "horarios",
                      label: "Horarios de atención",
                      trigger: "horarios",
                    },
                    {
                      value: "turno",
                      label: "Cómo sacar un turno",
                      trigger: "turno",
                    },
                    {
                      value: "reserva",
                      label: "Cómo veo mi reserva",
                      trigger: "reserva",
                    },
                    {
                      value: "pago",
                      label: "Métodos de pago",
                      trigger: "pago",
                    },
                    {
                      value: "finalizar",
                      label: "Finalizar servicio",
                      trigger: "finalizar",
                    },
                  ],
                },
                {
                  id: "horarios",
                  message:
                    "Los horarios de atención de Tegobi´s son: Lunes a Sábados de 9am a 12am y de 14pm a 20pm.",
                  trigger: "preguntaVuelta",
                },
                {
                  id: "turno",
                  component: (
                    <div>
                      Para poder sacar un turno debes dirigirte hacia el
                      apartado <Link to="/appointments">Turnos</Link>,
                      seleccionar fecha y hora que desea.
                    </div>
                  ),
                  trigger: "preguntaVuelta",
                },
                {
                  id: "reserva",
                  component: (
                    <div>
                      Para ver una reserva ya realizada, dirígete a{" "}
                      <Link to="/editprofile">Mi Perfil</Link>, ahí podrás
                      encontrar todas tus reservas realizadas hasta un apartado
                      de configuraciones.
                    </div>
                  ),
                  trigger: "preguntaVuelta",
                },
                {
                  id: "pago",
                  message:
                    "Los métodos de pago que disponemos son Efectivo y Transferencia desde el local ubicado en Oroño 1370.",
                  trigger: "preguntaVuelta",
                },
                {
                  id: "finalizar",
                  message:
                    "¡Muchas gracias por usar el chatbot! Ante cualquier duda o inquietud no dudes en abrir otro chat.",
                  trigger: "finCHAT",
                },
                {
                  id: "preguntaVuelta",
                  message: "¿Necesitas algo más?",
                  trigger: "masAyuda",
                },
                {
                  id: "masAyuda",
                  options: [
                    {
                      value: "si",
                      label: "Sí, necesito más ayuda",
                      trigger: "necesidad",
                    },
                    { value: "no", label: "No, gracias", trigger: "finCHAT" },
                  ],
                },
                {
                  id: "finCHAT",
                  message: "Estupendo, ¡ten un buen día!",
                  end: true,
                },
              ]}
            />
          </ThemeProvider>
        </div>
      )}
    </div>
  );
};

export default ChatBotComponent;
