#!/usr/bin/env node
/* Pewaktu assertion sederhana yang dipakai seluruh suite tes. */
let pass = 0;
let fail = 0;

export function ok(name, cond) {
  console.log(`${cond ? "PASS" : "FAIL"}  ${name}`);
  if (cond) pass++;
  else fail++;
}

export function section(title) {
  console.log(`\n── ${title} ${"─".repeat(Math.max(0, 58 - title.length))}`);
}

export function result() {
  return { pass, fail };
}

export function reset() {
  pass = 0;
  fail = 0;
}
