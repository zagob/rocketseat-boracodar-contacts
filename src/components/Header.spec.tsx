import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { Header } from "./Header";
import { store } from "../store";

beforeEach(() => {
  render(
    <Provider store={store}>
      <Header />
    </Provider>
  );
});

describe("Header component", () => {
  it("render text Heading", () => {
    const elementH1 = screen.getByText("Meus contatos");

    expect(elementH1).toBeInTheDocument();
  });
  it("render text on input placeholder", () => {
    const elementInput: HTMLInputElement = screen.getByPlaceholderText(
      "Busque por nome ou por dados de contato..."
    );

    expect(elementInput).toBeInTheDocument();
    expect(elementInput.value).toBe("");
  });

  it("write input change value", () => {
    const input: HTMLInputElement = screen.getByRole("textbox");

    expect(input.value).toBe("");
    fireEvent.change(input, { target: { value: "Valor" } });
    expect(input.value).toBe("Valor");
  });
});
