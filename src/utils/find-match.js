import toLowerCase from './to-lower-case';

const findMatch = target => source => toLowerCase(source.location).includes(toLowerCase(target)) && true;

export default findMatch;
