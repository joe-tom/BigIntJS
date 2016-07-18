/*
*  BI.add <- add the two big integers
*    @param num {BI | Number} - number to add this with
*    @param me {Boolen} - do this on yourself, or a new BI
*
*/

BI.prototype.add = function(num, me){
  // If me is set, do the operation on the current Big Integer, else make a new one
  var _bi = me ? this : new BI(this);

  // Make this a BigInteger if it's not
  if(!(num instanceof BI)){
    num = new BI(num);
  }

  var bS = _bi.n.length, nS = num.n.length;

  var carry = 0;

  // Add each chunk
  for(var i = 0;i < nS;i++){
    if(i >= bS){
      _bi.n.push(num.n[i]);
    }

    // Add the chunk
    _bi.n[i] += num.n[i];
    // Add the carry
    _bi.n[i] += carry;

    // Make the new carry
    carry = _bi.n[i] >> CHUNK_SIZE;
    _bi.n[i] &= AND_MASK;
  }

  return _bi
}


/*
*  BI.subtract <- subtract the two big integers
*    @param num {BI | Number} - number to subtract this with
*    @param me {Boolen} - do this on yourself, or a new BI
*
*/

BI.prototype.subtract = function(num, me){
  // If me is set, do the operation on the current Big Integer, else make a new one
  var _bi = me ? this : new BI(this);

  // Make this a BigInteger if it's not
  if(!(num instanceof BI)){
    num = new BI(num);
  }

  // Go through all the chunks and subtract them
  for(var i = 0,ii = num.n.length;i < ii;i++){
    _bi.n[i] -= num.n[i];
  }

  // Eliminate all the empty chunks
  var n = _bi.n.length;
  while(n--){
    if(!_bi.n[n]){
      _bi.n.pop();
    }else{
      break;
    }
  }


  return _bi
}