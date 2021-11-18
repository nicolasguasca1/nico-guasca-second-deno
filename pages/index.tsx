import { useDeno } from "aleph/react";
import React from "react";
import { GoMarkGithub } from "react-icons/go";

export default function Home() {
  const version = useDeno(() => {
    return Deno.version;
  });
  const verificationImages: string[] = useDeno(() => {
    return Array.from(Deno.readDirSync("public/images"))
      .map((dirEntry) => {
        return dirEntry.name;
      })
      .sort();
  });

  return (
    <div className="page">
      <head>
        <meta name="viewport" content="width=device-width" />
        <title>Gambatte Speedrun TAS Verification Automation</title>
        <link rel="stylesheet" href="../style/index.css" />
      </head>
      <main>
        <div className="topBar">
          <a
            className="cornerIcon"
            href="https://github.com/TiKevin83/pokemon/tree/gsr-test-automation/src/testing"
          >
            <GoMarkGithub /> Automation
          </a>
          <a
            className="cornerIcon"
            href="https://github.com/TiKevin83/gsr-automation-site"
          >
            <GoMarkGithub /> Site Source
          </a>
        </div>
        <h1 className="title">
          GB TAS Verification as Test Automation for Gambatte Speedrun
        </h1>

        <p className="description">
          Using console verified TASes as a test framework for Game Boy
          emulation accuracy
        </p>

        <p>
          Traditionally emulators have been tested via suites of test ROMs, a
          kind of micro-benchmark for specific console behaviors, in combination
          with regression tests for basic booting of games. Implementations of
          this can be seen in daid's{" "}
          <a href="https://daid.github.io/GBEmulatorShootout/">
            GB Emulator Shootout
          </a>{" "}
          and{" "}
          <a href="https://sameboy.github.io/automation/">
            SameBoy's automation
          </a>
          , which provided an inspiration for this post. This approach generally
          succeeds at tracking the accuracy of emulators, but it has pitfalls in
          the context of TASing. Tool-Assisted Speedruns generally require
          decently accurate emulators to maintain proper comparison between
          newer, faster TASes and the ones they obselete.
        </p>
        <p>
          Even further, the TASBot team and the rest of those involved in
          console verification require emulators that can replicate the exact
          state of the console at least at the time of each polled input. To
          learn more about console verification, you can visit the TASBot
          archive at <a href="https://runs.tas.bot/runs">runs.tas.bot</a>. The
          TASBot team frequently runs into issues where TASes that were
          previously known to sync between emulator and console stop syncing on
          newer revisions of the emulator. Many systems also aren't researched
          enough to have a suite of testROMs by which to evaluate their
          accuracy.
        </p>
        <p>
          This site aims to document a supplemental approach to testROMs for the
          emulator development scene, using known verified TASes as a test suite
          for emulation accuracy. Game Boy Console Verification is mainly
          performed using extrems'{" "}
          <a href="https://www.gc-forever.com/wiki/index.php?title=Game_Boy_Interface">
            Game Boy Interface
          </a>
          . Game Boy Interface takes an input log on a gamecube, with inputs
          timestamped relative to GBA audio samples, and sends those inputs to
          the Game Boy Player. You can find the available input logs at{" "}
          <a href="https://runs.tas.bot/runs">runs.tas.bot</a>, with more about
          how the dumps were made under Console Guides - GBC and in{" "}
          <a href="https://pastebin.com/ShLmxM6L">this pastebin</a>. The Game
          Boy Player attachment for the GameCube is also the main device used to
          record RTA speedruns of GB/GBC/GBA games. Therefore to maintain
          console accuracy for the purposes of the TASing scene, an emulator
          needs to be able to match the behavior of the GBA's Game Boy Color
          mode, as opposed to the behavior of the original "brick" DMG or the
          original Game Boy Color (the main difference being a BIOS change in
          the GBA-GBC mode). This mode was recently detailed in a{" "}
          <a href="https://youtu.be/_Qqg4VCZ0k8">
            video from Modern Vintage Gamer
          </a>
          .
        </p>
        <p>
          The below images are output from a continuous automation system taking
          the latest updates to Gambatte Speedrun and piping back in GBI input
          logs of known console verified TASes. Gambatte Speedrun is currently
          "passing" 41 of 46 verified TASes below. 36 of the 41 passing TASes
          are being read from GBI input logs, with the 5 others coming from
          known syncing TASes using their original BizHawk bk2 instead of the
          GBI dump.
        </p>
        <p>
          Two failures are coming from the "Hammerin' Harry" games, which were
          originally made in GBHawk, BizHawk's other main accuracy-focused GB
          TASing core. Many GBHawk TASes are syncing with their GBI dumps in
          this manner, but GBHawk may implement some behavior that Gambatte
          Speedrun does not in these games. Three other failures are coming from
          Oddworld Adventures II, Operation C, and Winnie The Pooh, Adventures
          in the 100 Acre Wood. Winnie the Pooh has a known syncing movie from
          Gambatte, but something about the dump from the published TAS isn't
          lining up. Oracle of Ages and Seasons are both passing, but sadly the
          timing for the image dump doesn't line up well for Seasons and the
          passing screen is blank white. Of particular note among the passes are
          Pokemon Gold and Crystal, which require an emulator to have an
          accurate RTC implementation with tunable Cart RTC clock offsets to
          match real cartridges (BizHawk's bk2 stores the cart offset for use
          here).
        </p>
        <div className="grid">
          {verificationImages.map((image, i) => (
            <div className="verification" key={i}>
              <p className="imageTitle">{image.split(".")[0]}</p>
              <img
                src={`images/${image}`}
                height={144}
                width={160}
                alt={image.split(".")[0]}
              />
            </div>
          ))}
        </div>
        <p>Powered by Deno v{version.deno}</p>
      </main>
    </div>
  );
}
