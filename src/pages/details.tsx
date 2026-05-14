import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../services/api";

function Details() {

  const { name } = useParams();

  const [country, setCountry] = useState<any>(null);

  useEffect(() => {

    async function loadCountry() {

      try {

        const response = await api.get(
          `/name/${name}?fullText=true`
        );

        setCountry(response.data[0]);

      } catch (error) {

        console.log(error);

      }

    }

    loadCountry();

  }, [name]);

  if (!country) {

    return (

      <h1
        style={{
          padding: 30
        }}
      >
        Carregando...
      </h1>

    );

  }

  return (

    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        padding: 30
      }}
    >

      <Link
        to="/"
        style={{
          textDecoration: "none",
          color: "#2563eb",
          fontWeight: "bold",
          fontSize: 18
        }}
      >
        ← Voltar
      </Link>

      <div
        style={{
          backgroundColor: "white",
          marginTop: 25,
          borderRadius: 20,
          padding: 30,
          boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
        }}
      >

        <img
          src={country.flags?.png}
          style={{
            width: "100%",
            maxWidth: 500,
            borderRadius: 15,
            marginBottom: 25
          }}
        />

        <h1
          style={{
            fontSize: 45,
            marginBottom: 20
          }}
        >
          {country.name?.common}
        </h1>

        <p
          style={{
            marginBottom: 10,
            fontSize: 18
          }}
        >
          <strong>🌎 Continente:</strong>{" "}
          {country.continents?.join(", ")}
        </p>

        <p
          style={{
            marginBottom: 10,
            fontSize: 18
          }}
        >
          <strong>🏙 Capital:</strong>{" "}
          {country.capital?.[0]}
        </p>

        <p
          style={{
            marginBottom: 10,
            fontSize: 18
          }}
        >
          <strong>👥 Habitantes:</strong>{" "}
          {country.population?.toLocaleString()}
        </p>

        <p
          style={{
            marginBottom: 10,
            fontSize: 18
          }}
        >
          <strong>🗺 Região:</strong>{" "}
          {country.region}
        </p>

        <p
          style={{
            marginBottom: 10,
            fontSize: 18
          }}
        >
          <strong>🗣 Idiomas:</strong>{" "}
          {(Object.values(country.languages || {}) as string[]).join(", ")}
        </p>

        <p
          style={{
            marginBottom: 10,
            fontSize: 18
          }}
        >
          <strong>💰 Moeda:</strong>{" "}
          {(Object.values(country.currencies || {})[0] as any)?.name}
        </p>

        <p
          style={{
            marginBottom: 10,
            fontSize: 18
          }}
        >
          <strong>🚗 Lado de direção:</strong>{" "}
          {country.car?.side === "right"
            ? "Direita"
            : "Esquerda"}
        </p>

        <p
          style={{
            marginBottom: 10,
            fontSize: 18
          }}
        >
          <strong>📞 Código telefônico:</strong>{" "}
          {country.idd?.root}
          {country.idd?.suffixes?.[0]}
        </p>

        <p
          style={{
            marginBottom: 10,
            fontSize: 18
          }}
        >
          <strong>⏰ Fusos horários:</strong>{" "}
          {country.timezones?.join(", ")}
        </p>

        <p
          style={{
            marginBottom: 10,
            fontSize: 18
          }}
        >
          <strong>🏳 Nome oficial:</strong>{" "}
          {country.name?.official}
        </p>

        <a
          href={country.maps?.googleMaps}
          target="_blank"
          style={{
            display: "inline-block",
            marginTop: 20,
            backgroundColor: "#2563eb",
            color: "white",
            padding: "12px 20px",
            borderRadius: 10,
            textDecoration: "none"
          }}
        >
          📍 Ver no Google Maps
        </a>

      </div>

    </div>

  );
}

export default Details;