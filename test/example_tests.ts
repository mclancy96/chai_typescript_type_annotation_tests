const greet = (name: string, greeting = "Hello"): string =>
  `${greeting}, ${name}.`;

const shout = (name: number, greeting: string = "Hello"): string =>
  `${greeting}, ${name}!`;

const snowball: string = "5";
const bowsnall: string[] = "5";

const swim = (): string => {
  return "done";
};

const swimmer = (): number => {
  return "done";
};

let loadingStatus: "loading" | "success" | "error" = "loading";

class Person {
  name: string;
  age: number;
  weight: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  meet(): string {
    return `Hi, I'm ${this.name}`;
  }
}
