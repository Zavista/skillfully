import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

const SignInComponent = () => {
  return (
    <SignIn
      appearance={{
        baseTheme: dark,
        elements: {
          rootBox: "flex justify-center items-center py-5",
          cardBox: "shadow-none",
          card: "bg-customgreys-secondarybg w-full shadow-none",
          formFieldLabel: "text-white-50 fonrt-normal",
          footer: {
            background: "#25262F",
            padding: "0rem 2.5rem",
            " & > div > div:nth-child(1)": {
              background: "#25262F",
            },
          },
          formButtonPrimary:
            "bg-primary-700 text-white-100 hover:bg-primary-600 !shadow-none",
          formFieldInput: "bg-customgres-primarybg text-white-50 !shadow-none",
          footerActionLink: "text-primary-750 hover:text-primary-600",
        },
      }}
    ></SignIn>
  );
};

export default SignInComponent;
