declare type SignUpParams = {
    firstName: string;
    lastName?: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    dateOfBirth: string;
    email: string;
    password: string;
  };

  
declare type LoginUser = {
    email: string;
    password: string;
  };
  
  declare type User = {
    $id: string;
    email: string;
    userId: string;
    firstName: string;
    lastName?: string;
    name: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    dateOfBirth: string;
    cart: string[];
  };
  
  declare type NewUserParams = {
    userId: string;
    email: string;
    name: string;
    password: string;
  };
  

  declare interface AuthFormProps {
    type: "sign-in" | "sign-up";
  }

  declare interface getUserInfoProps {
    userId: string;
  }

  declare interface signInProps {
    email: string;
    password: string;
  }

  declare interface HeaderBoxProps {
    type?: "title" | "header";
    title: string;
    subtext: string;
    user?: string;
  }

  export interface ProductCart {
    $id: string;
    name: string;
    price: number;
    discountedPrice: number;
    imageUrl: string;
  }