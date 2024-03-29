/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from 'ethers';
import type { FunctionFragment, Result } from '@ethersproject/abi';
import type { Listener, Provider } from '@ethersproject/providers';
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
} from './common';

export interface SurvivorInterface extends utils.Interface {
  functions: {
    'currentWinner()': FunctionFragment;
    'currentWinnerScore()': FunctionFragment;
    'guessed(address)': FunctionFragment;
    'playGame(string,uint256)': FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | 'currentWinner'
      | 'currentWinnerScore'
      | 'guessed'
      | 'playGame',
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: 'currentWinner',
    values?: undefined,
  ): string;
  encodeFunctionData(
    functionFragment: 'currentWinnerScore',
    values?: undefined,
  ): string;
  encodeFunctionData(functionFragment: 'guessed', values: [string]): string;
  encodeFunctionData(
    functionFragment: 'playGame',
    values: [string, BigNumberish],
  ): string;

  decodeFunctionResult(
    functionFragment: 'currentWinner',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(
    functionFragment: 'currentWinnerScore',
    data: BytesLike,
  ): Result;
  decodeFunctionResult(functionFragment: 'guessed', data: BytesLike): Result;
  decodeFunctionResult(functionFragment: 'playGame', data: BytesLike): Result;

  events: {};
}

export interface Survivor extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: SurvivorInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined,
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>,
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>,
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    currentWinner(overrides?: CallOverrides): Promise<[string]>;

    currentWinnerScore(overrides?: CallOverrides): Promise<[BigNumber]>;

    guessed(arg0: string, overrides?: CallOverrides): Promise<[boolean]>;

    playGame(
      _name: string,
      _guess: BigNumberish,
      overrides?: Overrides & { from?: string },
    ): Promise<ContractTransaction>;
  };

  currentWinner(overrides?: CallOverrides): Promise<string>;

  currentWinnerScore(overrides?: CallOverrides): Promise<BigNumber>;

  guessed(arg0: string, overrides?: CallOverrides): Promise<boolean>;

  playGame(
    _name: string,
    _guess: BigNumberish,
    overrides?: Overrides & { from?: string },
  ): Promise<ContractTransaction>;

  callStatic: {
    currentWinner(overrides?: CallOverrides): Promise<string>;

    currentWinnerScore(overrides?: CallOverrides): Promise<BigNumber>;

    guessed(arg0: string, overrides?: CallOverrides): Promise<boolean>;

    playGame(
      _name: string,
      _guess: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
    currentWinner(overrides?: CallOverrides): Promise<BigNumber>;

    currentWinnerScore(overrides?: CallOverrides): Promise<BigNumber>;

    guessed(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    playGame(
      _name: string,
      _guess: BigNumberish,
      overrides?: Overrides & { from?: string },
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    currentWinner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    currentWinnerScore(
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;

    guessed(
      arg0: string,
      overrides?: CallOverrides,
    ): Promise<PopulatedTransaction>;

    playGame(
      _name: string,
      _guess: BigNumberish,
      overrides?: Overrides & { from?: string },
    ): Promise<PopulatedTransaction>;
  };
}
