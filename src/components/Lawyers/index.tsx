// src/components/Lawyers/index.tsx
"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { IoIosArrowForward } from "react-icons/io";
import Image from "next/image";
import { montaguSlab } from "@/app/GoogleFonts";
import Link from "next/link";

import advogado_fundo from "public/advogado_fundo.png"
import bruno_pellizzetti from "public/bruno_pellizzetti.png"
import eduardo_walber from "public/eduardo_walber.png"
import joao_prado from "public/joao_prado.png"

const Lawyers = ({ slug }: { slug: string }) => {
  const controls = useAnimation();

  const lawyers = [
    {
      id: 1,
      slug: "bruno-pellizzetti",
      name: "Bruno Pellizzetti",
      image: bruno_pellizzetti,
      area: "Advogado Previdenciário",
      whatsapp: "https://api.whatsapp.com/send?phone=5545991313858",
      instagram: "https://www.instagram.com/brunopellizzetti/",
      email: "bruno@pellizzetti.adv.br",
      texts: [
        {
          title: "Início",
          text: `Tudo começou há muitos anos, quando meu irmão, Rafael Pellizzetti, ainda fazia estágio no INSS, quando cursava a faculdade UEL (Universidade Estadual de Londrina)\n

          Durante seu aprendizado, acabou se apaixonado pela área e iniciou sua carreira como advogado previdenciário em Cascavel justamente ajudando a própria família, como a nossa mãe sempre nos ensinou, colocando a família e seus clientes, sempre em primeiro lugar.\n
          
          Me lembro bem do dia em que fomos resolver uma questão da minha avó. Eu ainda não entendia muito bem como as questões previdenciárias funcionavam. Mas vejo até hoje a alegria dela receber os valores em atraso da revisão de sua aposentadoria.
          Depois de formado, meu irmão voltou às origens e abriu escritório em Cascavel, para exercer especificamente o direito previdenciário. Isso serviu de inspiração para seguir os seus passos, aprendendo pouco a pouco.\n
          
          A confiança e a amizade com os clientes sempre foram os pontos mais importantes na sua forma de advogar, com humildade e humanidade ímpares na profissão, priorizando, acima de tudo, os interesses dos seus clientes.\n
          
          Ele conseguiu aposentar milhares de pessoas, trabalhadores rurais, motoristas, cobradores, frentistas, pedreiros entre muitas profissões, fazendo a diferença na vida de todas estas pessoas, sempre cuidando dos seus processos com muito carinho, independente de quem fossem. Assim, obteve sucesso como advogado previdenciário em Cascavel, sem jamais esquecer a origem de nossa família, que também vem do meio rural terra, do trabalho duro e com muita simplicidade.`,
        },
        {
          title: "Aprendizado",
          text: `Com ele, aprendi que o direito previdenciário é a área de maior exigência e responsabilidade do advogado. Lidamos com um patrimônio construído pouco a pouco, tijolo a tijolo, com muito suor e muitas vezes às custas da própria saúde, para um momento de tranquilidade e descanso.\n

          Desta forma, aprendi que o advogado previdenciário deve estar atento a todas as alterações legislativas, mudanças de entendimento da jurisprudência, analisando com calma e detalhe todos os vínculos de trabalho do cliente, buscando a concessão ou revisão do benefício da melhor forma e com mais vantagens para o cliente, mesmo que tenhamos que recomendar que aguarde mais um tempo para realizar o requerimento.\n
          
          Nos pedidos de auxílio doença e aposentadoria por invalidez, é preciso possuir até conhecimentos médicos, saber os reflexos da doença e as dificuldades do cliente, trazendo um pouco de humanidade para os peritos do INSS e da Justiça.
          Assim, o advogado previdenciário pode traçar as melhores estratégias, ser eficaz e extremamente rápido, pois cada dia que passa é um dia menos na aposentadoria de seus clientes, sem deixar de ser combativo contra as ilegalidades cometidas pelo INSS e pelo Judiciário.`,
        },
        {
          title: "Um momento difícil e a carreira de advogado providenciário",
          text: `Depois de ajudar tantas pessoas nos seus momentos difíceis aqui em Cascavel, em idade avançada ou acometidos pelas doenças mais severas e diante do momento mais vulnerável de sua vida, meu irmão, Rafael Pellizzetti, teve em sua história uma trajetória diferente e nos deixou cedo demais, antes de completar 35 anos.
          Ele nos deixou, mas o fato é, todos os dias eu me deparo com pessoas e clientes que ainda sentem sua falta, da pessoa que era, de sua humildade e tratamento com todos, seu sucesso enfim, não veio por acaso.\n
          
          No primeiro momento que eu soube de sua morte eu decidi que iria tomar conta de tudo aquilo que ele havia construído como advogado previdenciário. Não houve tempo para chorar, apenas enfrentar aquele desafio que se abria para mim.
          E eu consegui vencer todas as barreiras, todas as dificuldades, abdicando de mim mesmo para crescer, dar continuidade ao que foi construído e me reconstruir profissionalmente e pessoalmente como ser humano, abraçando o direito previdenciário como a maior causa em minha vida.`,
        },
        {
          title: "O caminho seguido  como advogado previdenciário",
          text: `Já passados três anos da perda e dos momentos de maior dificuldade, consegui superar todos os desafios e manter todos os clientes de direito previdenciário em Cascavel. Por um momento, perdemos a referência do escritório, o advogado previdenciário é um amigo pessoal - insubstituível - mas a cada dia que passa, mais pessoas chegam e confiam na qualidade e na continuidade do trabalho que eu venho fazendo.\n

          Voltei a seguir seus passos cursando a especialidade de Direito Previdenciário, também na UEL, buscando conhecimento, especialização e a expansão do escritório, ajudando cada dia mais pessoas e continuar aquele legado que foi construído como advogado previdenciário.\n
          
          Assim, busquei conhecimento, especialização e a expansão do escritório, hoje com mais profissionais, buscando ajudar cada dia mais pessoas e continuar o legado do meu irmão, enfrentando novos desafios diariamente, estudando agora na Faculdade Cândido Mendes, o direito previdenciário do servidor público.
          Hoje, continuo a aprender e a me dedicar ao direito previdenciário em Cascavel, cuidado dos processos com o mesmo carinho e dedicação desde o início de nosso escritório. Agora também voltado para o público online, o que me permite ajudar pessoas do Brasil inteiro.\n
          
          Seja você morador de Cascavel ou tenha me conhecido pela internet, me envie uma mensagem, será um prazer tirar sua dúvida ou simplesmente ouvir sua história, assim como você ouviu a minha. Eu me lembro todos os dias da minha missão: Uma luta diária pelas pessoas, defendendo mais do que tudo, a sua própria história e seus direitos pela aposentadoria.
          `,
        },
      ],
    },
    {
      id: 2,
      slug: "eduardo-walber",
      name: "Eduardo Walber",
      image: eduardo_walber,
      area: "Advogado Previdenciário",
      whatsapp: "https://api.whatsapp.com/send?phone=5545991313858",
      instagram: "https://www.instagram.com/eduardo.walber98/",
      email: "eduardo@pellizzetti.adv.br",
      texts: [
        {
          title: "Início",
          text: `Nasci e cresci em Cascavel – PR. Passei a minha infância no Bairro Santa Cruz, uma região humilde que me ensinou muito sobre as dificuldades que toda família passa\n.

          Diante desse cenário, logo aos 14 anos comecei a ajudar meus pais por meio do meu trabalho, e a realidade difícil me trouxe muita maturidade para focar as minhas energias no estudo.`,
        },
        {
          title: "Dedicação",
          text: `Todo o esforço e dedicação me garantiram a tão sonhada e necessária bolsa de estudos para ingresso na Univel, uma das mais renomadas instituições de ensino do Direito da região.\n

          Durante os cinco anos da graduação continuei trabalhando em período integral, o que tornou a jornada bem mais árdua e me fez sentir na pele todos os obstáculos que a maioria dos estudantes enfrentam em nosso país.\n
          
          Ainda assim, jamais perdi o foco ou deixei de lado minhas obrigações acadêmicas, de modo que conclui o curso em 2020 com mérito, obtendo a láurea acadêmica e, logo após, conquistei a tão sonhada aprovação na OAB.\n
          
          Mesmo após a conclusão faculdade, continuei a jornada de estudos, e hoje sou pós-graduado em Direito Civil e Processo Civil pela Univel, e estou cursando duas pós-graduações na área previdenciária.`,
        },
        {
          title: "Jornada",
          text: `Minha trajetória profissional no Direito se iniciou em 2018, quando conheci o advogado – e hoje sócio – Dr. Bruno Pellizzetti, referência em atuação na área previdenciária, a quem admiro e tenho profunda gratidão pelo aprendizado fornecido.\n

          A partir daquele momento, comecei a entender, na prática, a importância do Direito Previdenciário na vida das pessoas, e como eu poderia traduzir aquele sentimento de justiça em ações efetivas em favor dos nossos clientes.
          No decorrer dos anos, também tive experiência com a área do Direito Civil e do Direito Securitário, o que ampliou ainda mais minha visão sobre o sistema jurídico como um todo.\n
          
          Porém, apesar do contato com outras áreas, sinto que minha grande missão é lutar pelo Direito das pessoas que, após uma longa vida dedicada ao trabalho ou em um momento delicado de suas vidas, merecem estar protegidos para descansar ou para se recuperar dignamente, obtendo o melhor benefício possível.\n
          
          Em razão desse sentimento, hoje, juntamente com a equipe do nosso escritório, tenho a missão de prover as melhores soluções e estratégias jurídicas possíveis aos nossos clientes, atuando tecnicamente no âmbito do Direito Previdenciário (aposentadorias em geral, auxílios por incapacidade e benefícios assistenciais), tanto na esfera contenciosa, por meio de processos administrativos e judiciais, como também na esfera consultiva e preventiva, realizando planejamentos e análises previdenciárias.`,
        },
      ],
    },
    {
      id: 3,
      slug: "joao-prado",
      name: "João Prado",
      image: joao_prado,
      area: "Advogado Previdenciário",
      whatsapp: "https://api.whatsapp.com/send?phone=5545991313858",
      instagram: "https://www.instagram.com/joao.prado91",
      email: "joao@pellizzetti.adv.br",
      texts: [
        {
          title: "Jornada",
          text: `Cresci e me criei em Cascavel, em um ambiente amoroso e repleto de apoio que me fez entender a importância da família e dos valores éticos o que se transformou em um forte senso de justiça e me encaminhou para a carreira jurídica.\n

          Em 2018, passei a fazer parte do time Pellizzetti Advocacia, sendo sua primeira experiência com o mundo jurídico na prática, local em que aprendi que a confiança e a amizade com os clientes são os pontos mais importantes, em conjunto com a prestação de um atendimento com humildade e humanidade, priorizando, acima de tudo, os interesses dos clientes.\n
          
          Neste período trabalhava com direito civil e tributário, iniciando minha jornada para proteger os interesses dos moradores dos bairros mais afetados com cobranças indevidas de contribuição de melhoria.`,
        },
        {
          title: "Ação do asfalto",
          text: `Em virtude de obras de pavimentação asfáltica descobri que havia cobranças indevidas, tomando a dor das famílias que tiveram sua economia familiar atingida em virtude das cobranças.\n

          Nesta campanha, lutei para defender os interesses dos clientes no Bairro Periolo, Santa Cruz e muitos outros.\n
          
          A batalha cominou no cancelamento de vários editais pela prefeitura de Cascavel e o sucesso da demanda se espalhou. O que permitiu a abrangência até de outras cidades, como por exemplo Assis Chateaubriand/PR.\n
          
          Por conta da realização de cobranças indevida dessa contribuição, desenvolvi experiência nessa área do direito tributário, processual, não deixando de lado outras diversas áreas de atuação junto ao escritório, como no direito previdenciário voltado ao setor público.`,
        },
        {
          title: "Entre em contato",
          text: `Seja você morador de Cascavel ou tenha vindo pela internet, me envie uma mensagem, será um prazer tirar sua dúvida ou simplesmente ouvir sua história, assim como você ouviu a minha. Eu me lembro todos os dias da minha missão: Uma luta diária pelas pessoas, defendendo mais do que tudo, a sua própria história e seus direitos.`,
        },
      ],
    },
  ];

  const profileAnimation = {
    hidden: {
      opacity: 0,
      y: 100,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
      return
    }
    controls.start("hidden");
  }, [controls, inView]);

  return (
    <main className="relative">
      <div className="semi_circle_left left-0 top-[28%] bg-[#4C6751]"></div>
      <div className="semi_circle_right right-0 top-[50%] bg-[#728F6B]"></div>
      <div className="semi_circle_left left-0 top-[70%] bg-[#9DAAA0]"></div>
      {lawyers.map((lawyer) => {
        if (lawyer.slug === slug) {
          return (
            <div key={lawyer.id} id="home">
              <div className="relative">
                <Image
                  width={1356}
                  height={246}
                  src={advogado_fundo}
                  alt="Advogado Benefício INSS Cascavel"
                  className="absolute mx-auto w-full max-h-full object-fill top-0 -z-10 hidden xl:block"
                  placeholder="blur"
                />
                <div className="w-[50%] h-[500px] bg-[#CBD4C9] absolute right-0 bottom-[185px] 2xl:bottom-[305px] -z-20"></div>
                <Link
                  href="/"
                  className="absolute bg-[#D9D9D9] w-[50px] h-[50px] top-[15%] left-[3%] lg:left-[10%] rounded-full flex items-center justify-center
                  hover:bg-[#EDEEED] transition-all duration-300 ease-in-out text-black"
                  aria-label="Voltar para página inicial"
                >
                  <IoIosArrowForward
                    size={40}
                    className="opacity-[52%] rotate-180 mr-[2px] transition-all duration-300 ease-in-out"
                  />
                </Link>
                <motion.div
                  className="flex flex-col justify-center items-center pt-[5px] xl:pt-[5%] gap-[20px] 2xl:gap-[50px]"
                  ref={ref}
                  initial="hidden"
                  animate={controls}
                  variants={profileAnimation}
                >
                  <Image
                    height={280}
                    width={280}
                    src={lawyer.image}
                    alt={`${lawyer.name} advogado previdenciário Cascavel`}
                    className="w-[300px] h-[300px] 2xl:w-[400px] 2xl:h-[400px] rounded-full p-[10px] bg-[#EDEEED]"
                    priority
                    placeholder="blur"
                  />
                  <div className="flex flex-col items-center">
                    <span className={`${montaguSlab.className} font-[500] text-[42px] 2xl:text-[60px] text-[#012B09]`}>
                      {lawyer.name}
                    </span>
                    <span className={`${montaguSlab.className} font-[400] text-[26px] 2xl:text-[40px] text-[#012B09]`}>
                      {lawyer.area}
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-[40px]">
                    <a href={lawyer.whatsapp} target="_blank" aria-label={`WhatsApp de ${lawyer.name}`} rel="nofollow">
                      <Image
                      width={36}
                      height={36}
                        src="/icon_wpp.svg"
                        alt="WhatsApp do Advogado Previdenciário em Cascavel"
                        className="w-[36px] h-[36px] 2xl:w-[50px] 2xl:h-[50px]"
                        loading="lazy"
                      />
                    </a>
                    <a href={lawyer.instagram} target="_blank" aria-label={`Instagram de ${lawyer.name}`} rel="nofollow">
                      <Image
                      width={36}
                      height={36}
                        src="/icon_insta.svg"
                        alt="Instagram do Advogado Previdenciário em Cascavel"
                        className="w-[36px] h-[36px] 2xl:w-[50px] 2xl:h-[50px]"
                        loading="lazy"
                      />
                    </a>
                    <a href={`mailto:${lawyer.email}`} target="_blank" aria-label={`Enviar email para ${lawyer.name}`} rel="nofollow">
                      <Image
                      width={36}
                      height={36}
                        src="/icon_email.svg"
                        alt="Email do Advogado Previdenciário em Cascavel"
                        className="w-[36px] h-[36px] 2xl:w-[50px] 2xl:h-[50px]"
                        loading="lazy"
                      />
                    </a>
                  </div>
                </motion.div>
              </div>

              <div className="container mx-auto py-[70px] 2xl:py-[120px] flex flex-col gap-[60px] md:gap-[110px] px-[20px]">
                {lawyer.texts.map((text) => {
                  return (
                    <div key={text.title} className="max-w-[1200px] mx-auto">
                      <h1 className={`${montaguSlab.className} font-[500] text-[42px] 2xl:text-[50px]`}>
                        {text.title}
                      </h1>
                      <p className={`${montaguSlab.className} font-[400] text-[20px] 2xl:text-[30px] mt-[40px] 2xl:mt-[80px] text-justify`}>
                        {text.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        }
      })}
    </main>
  );
};

export default Lawyers;
