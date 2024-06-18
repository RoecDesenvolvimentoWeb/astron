import { ReactElement } from "react";

export const MolImportantExtraInfoAsaasAccountCreate = (): ReactElement => {
  return (
    <>
      <div className="bg-[rgba(226,109,212,1)] w-full max-w-3xl text-white relative pr-2 rounded-r-md py-2">
        <div className="top-0 h-full w-[2px] bg-lilas-lv5 absolute" />
        <div className="pl-2 text-base md:text-lg">
          <p className="text-xl">Imortante!</p>
          <p className="text-base">
            Após vincular a conta certifique-se de ativa-la através do email
            recebido, e cadastrar uma chave pix{" "}
          </p>
          <p className="text-base">para começar a receber pagamentos.</p>
        </div>
      </div>
    </>
  );
};
