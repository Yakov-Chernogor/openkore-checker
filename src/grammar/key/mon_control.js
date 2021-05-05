class mon_control {
  check_value(value) {
    if (
      /^(-1|0|1|2|3) ?([\d-]+)? ?(0|1)? ?(0|1)? ?(\d+)? ?(\d+)? ?(\d+)? ?(\d+)? ?([\d.]+)?$/.test(
        value
      )
    ) {
      return {
        valid: true,
        pos: null,
      };
    }
    let m = value.match(
      /^(\S+) ?(\S+) ?(\S+)? ?(\S+)? ?(\S+)? ?(\S+)? ?(\S+)? ?(\S+)? ?(\S+)?$/
    );
    if (!m)
      return {
        valid: false,
        pos: null,
      };
    let offset = m[1].length + 1;
    for (const [i, value] of m.entries()) {
      if (i > 0) {
        if (!this.value_template[i - 1].test(value)) {
          return {
            valid: false,
            value: value,
            pos: offset,
            len: value.length,
          };
        }
        offset += value.length + 1;
      }
    }

    return {
      valid: false,
      pos: null,
    };
  }

  value_template = [
    /^(-1|0|1|2|3)$/,
    /(^[\d-]+)$/,
    /^(0|1)$/,
    /^(0|1)$/,
    /^\d+$/,
    /^\d+$/,
    /^\d+$/,
    /^\d+$/,
    /^\d+\.\d+$/,
  ];
}

module.exports = mon_control;
