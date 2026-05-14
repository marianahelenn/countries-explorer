import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";

function Home() {

  const [countries, setCountries] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");

  useEffect(() => {

    api.get("/all?fields=name,flags,population,subregion")
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

  }, []);

  return (

    <div
      style={{
        padding: 20,
        background: "linear-gradient(to right, #eef2ff, #f8fafc)",
        minHeight: "100vh"
      }}
    >

      <h1
        style={{
        marginBottom: 10,
        fontSize: 40,
        color: "#1e3a8a",
        fontWeight: "bold"
}}
      >
        🌍 Lista de Países
      </h1>

      <p
        style={{
          marginBottom: 30,
          color: "#555",
          maxWidth: 700,
          lineHeight: 1.5
        }}
      >
        Explore informações sobre países do mundo inteiro.
        Pesquise por nome, filtre por sub-região e clique em um país
        para visualizar detalhes completos como capital,
        idiomas, moedas, localização e muito mais.
      </p>

      <input
        type="text"
        placeholder="Buscar país"
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: 10,
          width: 300,
          marginBottom: 20,
          borderRadius: 8,
         border: "none",
         boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
        }}
      />

      <select
        onChange={(e) => setRegion(e.target.value)}
        style={{
          padding: 10,
          marginLeft: 10,
          borderRadius: 8,
          border: "1px solid #ccc"
        }}
      >

        <option value="">
          Todas regiões
        </option>

        <option value="Africa">
          África
        </option>

        <option value="Americas">
          Américas
        </option>

        <option value="Asia">
          Ásia
        </option>

        <option value="Europe">
          Europa
        </option>

        <option value="Oceania">
          Oceania
        </option>

      </select>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 20,
          marginTop: 20
        }}
      >

        {countries

          .filter((country: any) =>

            country.name.common
              .toLowerCase()
              .includes(search.toLowerCase())

          )

          .filter((country: any) =>

            region === ""
              ? true
              : country.region === region

          )

          .map((country: any) => (

            <Link
              key={country.name.common}
              to={`/country/${encodeURIComponent(country.name.common)}`}
              style={{
                textDecoration: "none",
                color: "inherit"
              }}
            >

              <div
                style={{
                  backgroundColor: "white",
                  borderRadius: 12,
                  overflow: "hidden",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                  cursor: "pointer",
                  transition: "0.3s"
                }}
              >

                <img
                  src={country.flags.png}
                  style={{
                    width: "100%",
                    height: 180,
                    objectFit: "cover",
                    borderBottom: "4px solid #2563eb"
                  }}
                />

                <div
                  style={{
                    padding: 15
                  }}
                >

                  <h2
                    style={{
                      marginBottom: 10
                    }}
                  >
                    {country.name.common}
                  </h2>

                  <p>
                    <strong>👥 População:</strong>{" "}
                    {country.population.toLocaleString()}
                  </p>

                  <p>
                    <strong>🌎 Sub-região:</strong> {country.subregion}
                  </p>

                </div>

              </div>

            </Link>

          ))}

      </div>

    </div>

  );
}

export default Home;