import { ReactElement } from "react";

interface IMolFreeChannelHowWorksProps {
    togglePopup: () => unknown
}

export const MolFreeChannelHowWorks = ({
    togglePopup
}: IMolFreeChannelHowWorksProps): ReactElement => {
    return (
        <>
            <div className="h-full overflow-y-scroll w-[100%] sm:max-w-[50%] bg-[#fff] py-[100px] px-[40px] absolute left-[50%] translate-x-[-50%] top-[0] rounded-[10px]">
                <button
                    type="button"
                    className="text-center  text-[2rem] absolute top-[10px] left-[40px]"
                    onClick={togglePopup}
                >
                              ×
                </button>
                <h1 className="text-[2rem] text-center mb-[1rem]">
                              🚀 Seu bot agora também pode administrar canais gratuitos
                              (FREE)!
                </h1>
                <div>
                    <div className="text-left">
                        <p className="mb-4">
                                      ⚠️ Esse recurso só pode ser usado em canais privados com
                                      links de aprovação.
                        </p>

                        <p className="font-bold mb-2">
                                      Checklist para utilizar esse recurso incrível:
                        </p>

                        <ol className="list-decimal list-inside mb-4">
                            <li className="mb-2">
                                          Adicione seu bot como administrador do seu canal FREE;
                            </li>
                            <li className="mb-2">
                                          Acesse sua conta na plataforma e vá para "Canal FREE".
                                          Clique no ícone "atualizar" e, quando o nome do seu canal
                                          FREE aparecer, confirme clicando em "sim";
                            </li>
                            <li className="mb-2">
                                            Defina uma mensagem de boas-vindas atraente e estratégica:
                                <p className="ml-4 mb-2">
                                    <span className="font-bold">Exemplo:</span>{" "}
                                    <span className="italic">
                                                  "Oiiii... Percebi que você solicitou entrar no meu
                                                  Canal FREE, mas só lembrando que a promoção do meu
                                                  canal VIP está prestes a encerrar! Aproveita agora,
                                                  pois em poucos minutos o valor vai dobrar... Venha!";
                                    </span>
                                </p>
                            </li>
                            <li className="mb-2">
                                            Defina o tempo em segundos para que o bot aceite as
                                            solicitações de entrada no canal gratuito;
                                <p className="ml-4 mb-2">
                                    <span className="font-bold">Exemplo:</span>{" "}
                                    <span className="italic">
                                                  3600 (pois 3600 segundos equivalem a 1 hora).
                                    </span>
                                </p>
                            </li>
                            <li className="mb-2">
                                            Crie um link de "aprovação" no seu canal FREE.
                                <p className="ml-4 font-bold mb-2">
                                              🤔 Como criar um link de aprovação?
                                </p>
                                <ol className="ml-4 list-decimal list-inside mb-2">
                                    <li className="mb-2">
                                                  No seu canal gratuito, vá para "link de convite";
                                    </li>
                                    <li className="mb-2">Clique em "criar novo link";</li>
                                    <li className="mb-2">
                                                  Ative a opção "pedir aprovação dos administradores";
                                    </li>
                                </ol>
                            </li>
                        </ol>

                        <p className="mb-4">
                            <span className="font-bold">Pronto!</span> Se precisar, leia novamente!
                        </p>

                        <p className="mb-2">
                            <span className="font-bold">Entenda o funcionamento:</span>{" "}
                                        O bot irá aprovar automaticamente todos os usuários que
                                        solicitarem entrar no canal gratuito, sendo aceitos após o
                                        período em segundos configurado.
                        </p>

                        <p className="mb-2">
                                      Ao divulgar esse link do seu canal gratuito, todos que
                                      solicitarem entrada receberão uma mensagem do seu bot no
                                      chat privado, convidando-os para o VIP e, além disso, eles
                                      serão adicionados instantaneamente à sua lista de
                                      transmissão do bot!
                        </p>

                        <p className="mb-2">
                                      Esse recurso é simplesmente incrível, podemos garantir, pois
                                      já realizamos vários testes!
                        </p>

                        <p className="mb-2">
                                      Aproveite! Em caso de dúvidas, entre em contato com o
                                      suporte!
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}