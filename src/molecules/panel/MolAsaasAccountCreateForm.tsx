/* eslint-disable @typescript-eslint/indent */
import { AtomBtn } from "@atom/AtomBtn";
import { AtomDivLabel } from "@atom/AtomDivLabel";
import { AtomForm } from "@atom/AtomForm";
import { AtomInputField } from "@atom/AtomInputField";
import { AtomLabel } from "@atom/AtomLabel";
import { AtomLoading } from "@atom/AtomLoading";
import { AtomSelect } from "@atom/AtomSelect";
import { FormEvent, ReactElement, useEffect, useState } from "react";
import { validateFieldsOnSubmit } from "utils/validateFieldOnSubmit";

type TCompany = "ASSOCIATION" | "MEI" | "LIMITED" | "INDIVIDUAL" | undefined

export interface IAsaasAccount {
  cpfCnpj: string;
  name: string;
  email: string;
  address: string;
  addressNumber: string;
  mobilePhone: string;
  postalCode: string;
  province: string;
  birthDate: Date;
  companyType: TCompany
  incomeValue: number
}

interface IMolAsaasAccountCreateFormProps {
  onRegisterAsaasAccount: (data: IAsaasAccount) => unknown;
  isCreating: boolean
}

interface IFieldValidation {
  [fieldName: string]: {
    isValid: boolean;
    messageError?: string;
  };
}

const INITIAL_VALIDATION: IFieldValidation = {
  email: {
    isValid: false,
    messageError: "Email inválido",
  },
  name: {
    isValid: false,
    messageError: "Nome inválido",
  },
  cpfCnpj: {
    isValid: false,
    messageError: "CPF ou CNPJ inválido",
  },
  mobilePhone: {
    isValid: false,
    messageError: "Número inválido",
  },
  address: {
    isValid: false,
    messageError: "Endereço inválido",
  },
  addressNumber: {
    isValid: false,
    messageError: "Número do endereço inválido",
  },
  province: {
    isValid: false,
    messageError: "Bairro inválido",
  },
  birthDay: {
    isValid: false,
    messageError: "Dia inválido",
  },
  birthMonth: {
    isValid: false,
    messageError: "Mês inválido",
  },
  birthYear: {
    isValid: false,
    messageError: "Ano inválido",
  },
  postalCode: {
    isValid: false,
    messageError: "Cep inválido"
  }
};

const INITIAL_ASAAS_ACCOUNT: IAsaasAccount = {
  address: "",
  name: "",
  birthDate: new Date(),
  cpfCnpj: "",
  email: "",
  postalCode: "",
  province: "",
  addressNumber: "",
  mobilePhone: "",
  companyType: undefined,
  incomeValue: 0
};


export const MolAsaasAccountCreateForm = ({
  onRegisterAsaasAccount,
  isCreating
}: IMolAsaasAccountCreateFormProps): ReactElement => {
  const [asaasAccount, setAsaasAccount] = useState<IAsaasAccount>(
    INITIAL_ASAAS_ACCOUNT
  );
  const [validation, setValidation] =
    useState<IFieldValidation>(INITIAL_VALIDATION);
  const [birthDate, setBirthDate] = useState({
    date: 1,
    month: 12,
    year: 1999
  })

  useEffect(() => {
    setValidation(INITIAL_VALIDATION)
    setAsaasAccount(INITIAL_ASAAS_ACCOUNT)
  }, [])

  useEffect(() => {
    const date = String(birthDate.date).length == 1 ? `0${birthDate.date}` : birthDate.date.toString()
    const month = String(birthDate.month).length == 1 ? `0${birthDate.month}` : birthDate.month.toString()
    setAsaasAccount({
      ...asaasAccount,
      birthDate: new Date(Date.parse(`${birthDate.year}-${month}-${date}`))
    })
  }, [birthDate])

  const onRegisterAccount = (e: FormEvent): void => {
    e.preventDefault();
    if (validateFieldsOnSubmit(validation)) {
      onRegisterAsaasAccount(asaasAccount);
    }
  };
  return (
    <>
      <div className="relative bg-white rounded-[16px] flex flex-col pt-[60px] pb-[64px] px-[43px] w-full md:w-fit h-full md:min-w-[812px] max-lg:max-w-[100%] max-lg:w-[100%] max-lg:min-w-[100%]">
        <div className="absolute top-6 right-16">
            <AtomLoading isInView={isCreating}/>
          </div>
        <AtomForm onSubmit={onRegisterAccount}>
          <div className="flex gap-8 max-lg:flex-col">
            <AtomDivLabel>
              <AtomLabel>Nome</AtomLabel>
              <AtomInputField
                className="w-[20rem] max-lg:w-[70vw]"
                onChange={(data, validationStatus): void => {
                  setAsaasAccount({
                    ...asaasAccount,
                    name: data,
                  });
                  setValidation({
                    ...validation,
                    name: validationStatus,
                  });
                }}
                placeHolder={"Seu nome"}
                fieldsPattern={{
                  field: "name",
                  patterns: [
                    {
                      messageError: "Nome inválido",
                      regexp: /^[\W\wÀ-ÿ\u00f1\u00d1\s]+$/,
                    },
                  ],
                }}
                inputType={"text"}
              />
            </AtomDivLabel>
            <AtomDivLabel>
              <AtomLabel>Email</AtomLabel>
              <AtomInputField
                className="w-[20rem] max-lg:w-[70vw]"
                onChange={(data, validationStatus): void => {
                  setAsaasAccount({
                    ...asaasAccount,
                    email: data,
                  });
                  setValidation({
                    ...validation,
                    email: validationStatus,
                  });
                }}
                placeHolder={"email@gmail.com"}
                fieldsPattern={{
                  field: "email",
                  patterns: [
                    {
                      messageError: "Email inválido",
                      regexp: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    },
                  ],
                }}
                inputType={"email"}
              />
            </AtomDivLabel>
          </div>
          <div className="flex gap-8 max-lg:flex-col">
            <AtomDivLabel>
              <AtomLabel>Data de Nascimento</AtomLabel>
              <div className="flex gap-2 w-[20rem]">
                <AtomInputField
                  className="w-[5rem]"
                  onChange={(day, validationStatus): void => {
                    setBirthDate({
                      ...birthDate,
                      date: parseInt(day)
                    })
                    setValidation({
                      ...validation,
                      birthDay: validationStatus,
                    });
                  }}
                  placeHolder={"Dia"}
                  fieldsPattern={{
                    field: "birthDay",
                    patterns: [
                      {
                        messageError: "Dia inválido",
                        regexp: /^(0?[1-9]|[12][0-9]|3[01])$/,
                      },
                    ],
                  }}
                  inputType={"text"}
                />
                <AtomInputField
                  className="w-[5rem]"
                  onChange={(month, validationStatus): void => {
                    setBirthDate({
                      ...birthDate,
                      month: parseInt(month)
                    })
                    setValidation({
                      ...validation,
                      birthMonth: validationStatus,
                    });
                  }}
                  placeHolder={"Mês"}
                  fieldsPattern={{
                    field: "birthMonth",
                    patterns: [
                      {
                        messageError: "Mês inválido",
                        regexp: /^(0?[1-9]|1[0-2])$/,
                      },
                    ],
                  }}
                  inputType={"text"}
                />
                <AtomInputField
                  className="w-[9rem]"
                  onChange={(year, validationStatus): void => {
                    setBirthDate({
                      ...birthDate,
                      year: parseInt(year)
                    })
                    setValidation({
                      ...validation,
                      birthYear: validationStatus,
                    });
                  }}
                  placeHolder={"Ano"}
                  fieldsPattern={{
                    field: "birthYear",
                    patterns: [
                      {
                        messageError: "Ano inválido",
                        regexp: /^\d{4}$/,
                      },
                    ],
                  }}
                  inputType={"text"}
                />
              </div>
            </AtomDivLabel>
            <AtomDivLabel>
              <AtomLabel>CPF ou CNPJ</AtomLabel>
              <AtomInputField
                className="w-[20rem] max-lg:w-[70vw]"
                onChange={(data, validationStatus): void => {
                  setAsaasAccount({
                    ...asaasAccount,
                    cpfCnpj: data,
                  });
                  setValidation({
                    ...validation,
                    cpfCnpj: validationStatus,
                  });
                }}
                placeHolder={"000.000.000-00 ou 00.000.000/0000-00"}
                fieldsPattern={{
                  field: "cpfCnpj",
                  patterns: [
                    {
                      messageError: "CPF ou CNPJ inválido",
                      regexp:
                        /([0-9]{2}[.]?[0-9]{3}[.]?[0-9]{3}[/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[.]?[0-9]{3}[.]?[0-9]{3}[-]?[0-9]{2})/,
                    },
                  ],
                }}
                inputType={"text"}
              />
            </AtomDivLabel>
          </div>
          <div className="flex gap-8 max-lg:flex-col">
            <AtomDivLabel>
              <AtomLabel>Número de telefone</AtomLabel>
              <AtomInputField
                className="w-[20rem] max-lg:w-[70vw]"
                onChange={(data, validationStatus): void => {
                  setAsaasAccount({
                    ...asaasAccount,
                    mobilePhone: data,
                  });
                  setValidation({
                    ...validation,
                    mobilePhone: validationStatus,
                  });
                }}
                placeHolder={"(99) 99999-9999"}
                fieldsPattern={{
                  field: "mobilePhone",
                  patterns: [
                    {
                      messageError: "Número inválido",
                      regexp: /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
                    },
                  ],
                }}
                inputType={"text"}
              />
            </AtomDivLabel>
            <AtomDivLabel>
              <AtomLabel>Logradouro</AtomLabel>
              <AtomInputField
                className="w-[20rem] max-lg:w-[70vw]"
                onChange={(data, validationStatus): void => {
                  setAsaasAccount({
                    ...asaasAccount,
                    address: data,
                  });
                  setValidation({
                    ...validation,
                    address: validationStatus,
                  });
                }}
                placeHolder={"Seu endereço"}
                fieldsPattern={{
                  field: "address",
                  patterns: [
                    {
                      messageError: "Endereço inválido",
                      regexp: /^[\W\w\s,'-]*$/,
                    },
                  ],
                }}
                inputType={"text"}
              />
            </AtomDivLabel>
          </div>
          <div className="flex gap-8 max-lg:flex-col">
            <AtomDivLabel>
              <AtomLabel>Bairro</AtomLabel>
              <AtomInputField
                className="w-[20rem] max-lg:w-[70vw]"
                onChange={(data, validationStatus): void => {
                  setAsaasAccount({
                    ...asaasAccount,
                    province: data,
                  });
                  setValidation({
                    ...validation,
                    province: validationStatus,
                  });
                }}
                placeHolder={"Seu bairro"}
                fieldsPattern={{
                  field: "province",
                  patterns: [
                    {
                      messageError: "Bairro inválido",
                      regexp: /^[\W\w\s]*$/,
                    },
                  ],
                }}
                inputType={"text"}
              />
            </AtomDivLabel>
            <AtomDivLabel>
              <AtomLabel>Número</AtomLabel>
              <AtomInputField
                className="w-[20rem] max-lg:w-[70vw]"
                onChange={(data, validationStatus): void => {
                  setAsaasAccount({
                    ...asaasAccount,
                    addressNumber: data,
                  });
                  setValidation({
                    ...validation,
                    addressNumber: validationStatus,
                  });
                }}
                placeHolder={"Número"}
                fieldsPattern={{
                  field: "addressNumber",
                  patterns: [
                    {
                      messageError: "Número do endereço inválido",
                      regexp: /^[0-9]+$/,
                    },
                  ],
                }}
                inputType={"text"}
              />
            </AtomDivLabel>
          </div>
          <div className="flex gap-8 max-lg:flex-col items-end">
            <AtomDivLabel>
              <AtomLabel>CEP</AtomLabel>
              <AtomInputField
                className="w-[20rem] max-lg:w-[70vw]"
                onChange={(data, validationStatus): void => {
                  setAsaasAccount({
                    ...asaasAccount,
                    postalCode: data,
                  });
                  setValidation({
                    ...validation,
                    postalCode: validationStatus,
                  });
                }}
                placeHolder={"00000-000"}
                fieldsPattern={{
                  field: "postalCode",
                  patterns: [
                    {
                      messageError: "CEP inválido", // Mensagem de erro
                      regexp: /^\d{5}-?\d{3}$/, // Regex para validar o CEP (00000-000)
                    },
                  ],
                }}
                inputType={"text"}
              />
            </AtomDivLabel>
            <AtomDivLabel className="w-full">
              <AtomLabel>Tipo de compania (Para empresas)</AtomLabel>
              <AtomSelect
                className="w-full md:w-[321px]"
                onChange={(data): void => {
                  setAsaasAccount({
                    ...asaasAccount,
                    companyType: data === "" ? undefined : data as TCompany,
                  });
                }}
                defaultValue={{
                  text: "",
                  value: ""
                }}
                options={[
                  {
                    text: "",
                    value: ""
                  },
                  {
                    text: "Mei",
                    value: "MEI"
                  },
                  {
                    text: "Limitada",
                    value: "LIMITED"
                  },
                  {
                    text: "Individual",
                    value: "INDIVIDUAL"
                  },
                  {
                    text: "Associação",
                    value: "ASSOCIATION"
                  }
                ]}
              />
            </AtomDivLabel>
          </div>
          <div className="flex gap-8 max-lg:flex-col items-end">
            <AtomDivLabel>
              <AtomLabel>Renda mensal/Faturamento</AtomLabel>
              <AtomInputField
                className="w-[20rem] max-lg:w-[70vw]"
                onChange={(data): void => {
                  setAsaasAccount({
                    ...asaasAccount,
                    incomeValue: Number(data),
                  })
                }}
                placeHolder={"0 R$"}
                inputType={"text"}
              />
            </AtomDivLabel>
          </div>
          <AtomBtn
              btnType={"submit"}
              className="text-white  bg-gradient-to-r from-lilas-lv1 to-lilas-lv5 text-sm sm:text-base md:text-lg w-[20rem]"
            >
              Vincular conta
            </AtomBtn>
        </AtomForm>
      </div>
    </>
  );
};
