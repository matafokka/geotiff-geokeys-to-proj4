type UnaryFn = (arg: any) => any;

/* Recursively builds the expected tuple of functions based on the actual arguments passed */
type PipeArgs<Fns extends UnaryFn[], In> = Fns extends [infer First extends UnaryFn, ...infer Rest extends UnaryFn[]]
  ? [(arg: In) => ReturnType<First>, ...PipeArgs<Rest, ReturnType<First>>]
  : [];

/* Extracts the return type of the last function in the array */
type LastReturnType<Fns extends UnaryFn[], Fallback> = Fns extends [...any[], infer Last extends UnaryFn]
  ? ReturnType<Last>
  : Fallback;

/**
 * Pipes the result of a function to the next function
 *
 * @param first First function that accepts no arguments
 * @param fns Functions where each function accepts the output of the previous function
 * @returns The result of the last function
 */
export function pipe<First extends () => any, Fns extends UnaryFn[]>(
  first: First,
  ...fns: PipeArgs<Fns, ReturnType<First>> extends Fns ? Fns : PipeArgs<Fns, ReturnType<First>>
): LastReturnType<Fns, ReturnType<First>> {
  return fns.reduce((acc, fn) => fn(acc), first());
}
