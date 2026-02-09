// ... (garder tout le haut du code avec le LocalStorage inchangé)

  return (
    <div className="card-item" style={{
      backgroundImage: `url(${bgCard})`,
      backgroundSize: "100% 100%",
      backgroundRepeat: "no-repeat",
      borderRadius: "15px",
      display: "flex",
      flexDirection: "column",
      height: "100%",
      position: "relative",
      padding: "5px" // Un peu d'espace interne pour ne pas coller aux bords de bg-c
    }}>
      <style>{`
        .image-container { width: 100%; height: 170px; display: flex; align-items: center; justify-content: center; position: relative; }
        .product-img { width: 80%; height: 80%; object-fit: contain; z-index: 2; filter: drop-shadow(0 10px 10px rgba(0,0,0,0.3)); }

        .price-badge-overlay {
          position: absolute; top: 10px; right: 15px; background: #ff4757; color: white;
          padding: 6px 14px; border-radius: 4px; font-weight: 950; font-size: 1.4rem;
          z-index: 10; border: 3px solid #000; box-shadow: 4px 4px 0px #000;
          transform: rotate(5deg); /* Effet diamant décalé */
        }

        .card-content { padding: 10px 15px; display: flex; flex-direction: column; gap: 12px; flex-grow: 1; }

        /* CADRE DESCRIPTION STYLE DIAMANT */
        .info-box {
          background: #fffdf2; /* Blanc crème rétro */
          padding: 12px;
          border-radius: 2px;
          border: 3px solid #000;
          box-shadow: 5px 5px 0px rgba(0,0,0,0.1);
          transform: rotate(-1deg); /* Contre-balancement visuel */
          position: relative;
        }
        .card-title { font-size: 1.25rem; font-weight: 950; color: #000; margin: 0; text-transform: uppercase; letter-spacing: -0.5px; }
        .card-description { font-size: 0.8rem; font-weight: 700; color: #444; margin-top: 5px; line-height: 1.2; }

        /* CADRE OPTIONS STYLE STICKER */
        .options-box {
          background: #f8f8f8;
          padding: 10px;
          border-radius: 2px;
          border: 2px solid #000;
          border-style: solid;
          position: relative;
          box-shadow: 4px 4px 0px #000;
        }
        .option-group-label {
          font-size: 0.7rem; font-weight: 900; text-transform: uppercase;
          background: #000; color: #fff; padding: 2px 6px;
          display: inline-block; margin-bottom: 8px; transform: skewX(-10deg);
        }

        .chips-container { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 8px; }

        /* Boutons d'options style "bouton pression" */
        .chip {
          padding: 5px 8px; border-radius: 4px; font-size: 0.65rem; font-weight: 900;
          cursor: pointer; border: 2px solid #000; background: #fff;
          transition: all 0.1s;
        }
        .chip.active {
          background: #ffd32a; /* Jaune pour les extras */
          transform: translate(-2px, -2px);
          box-shadow: 2px 2px 0px #000;
        }
        .chip.remove.active {
          background: #ff4757; /* Rouge pour ce qu'on enlève */
          color: #fff;
          text-decoration: line-through;
          box-shadow: 2px 2px 0px #000;
        }

        .card-footer { padding: 10px 15px 20px 15px; margin-top: auto; }

        /* BOUTON PRINCIPAL STYLE "ARCADE" */
        .add-btn-modern {
          width: 100%; background: #f1c40f; color: #000; border: 3px solid #000; padding: 15px;
          font-weight: 950; cursor: pointer; text-transform: uppercase; border-radius: 8px;
          font-size: 1.1rem; letter-spacing: 1px;
          box-shadow: 0 6px 0px #c49b09;
          transition: all 0.1s;
        }
        .add-btn-modern:active { transform: translateY(3px); box-shadow: 0 2px 0px #c49b09; }
        .add-btn-modern.success { background: #2ed573; color: white; box-shadow: 0 6px 0px #1d914d; }
      `}</style>

      {/* Rendu du reste identique... */}
// ...
