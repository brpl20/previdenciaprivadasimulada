// import YouTube, { YouTubeProps } from "react-youtube";

function Tutorial() {
    // const opts: YouTubeProps["opts"] = {
    //     width: "100%",
    //     height: "100%",
    //     playerVars: {
    //         autoplay: 0,
    //         rel: 0,
    //     },
    // };

    return (
        <div className="bg-white rounded-lg shadow p-4 max-w-5xl mx-auto mt-10">
            <h2 className="text-[21px] text-[#012B09] font-semibold mb-3">
                Como Usar a Calculadora de Previdência Privada
            </h2>

            <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="flex-1 text-[16px] text-[#333333] space-y-3">
                    <p>
                        Neste vídeo, o advogado previdenciário Bruno Pellizzetti mostra como utilizar a calculadora de previdência privada desenvolvida por ele para simular investimentos em planos PGBL e VGBL.
                    </p>
                    <p>
                        A ferramenta permite calcular projeções de aposentadoria com base no salário atual, idade, taxa de rentabilidade, contribuição mensal e tipo de regime tributário (progressivo ou regressivo).
                    </p>
                    <p>
                        Também é possível visualizar a economia de imposto de renda ao longo dos anos e simular estratégias de reinvestimento. Ideal para quem busca entender melhor os impactos de cada decisão na previdência privada.
                    </p>
                </div>
                <div className="w-full md:w-[480px] md:h-[270px] rounded-lg overflow-hidden shadow-lg">
                    <iframe
                        width="100%"
                        height="100%"
                        src="https://www.youtube.com/embed/qtp_czgcfuA"
                        title="YouTube video"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
                {/* <div className="w-full md:w-[480px] md:h-[270px] rounded-lg overflow-hidden shadow-lg">
                    <YouTube
                        videoId="qtp_czgcfuA"
                        opts={opts}
                        className="w-full h-full"
                    />
                </div> */}
            </div>
        </div>
    );
}

export default Tutorial;
