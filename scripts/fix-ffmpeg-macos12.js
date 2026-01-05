#!/usr/bin/env node

/**
 * Fix for macOS 12 (Monterey) FFmpeg compatibility issue
 *
 * The bundled FFmpeg in @remotion/compositor-darwin-arm64 requires macOS 13+
 * due to AVCaptureDeviceTypeDeskViewCamera symbol.
 *
 * This script replaces the bundled FFmpeg/ffprobe with symlinks to Homebrew versions.
 */

const fs = require("fs")
const path = require("path")
const os = require("os")

// Only run on macOS
if (os.platform() !== "darwin") {
    console.log("Skipping FFmpeg fix (not on macOS)")
    process.exit(0)
}

// Check if we're on macOS 12 or earlier
const version = os.release()
const majorVersion = parseInt(version.split(".")[0])
// macOS 12 = Darwin 21.x, macOS 13 = Darwin 22.x
if (majorVersion >= 22) {
    console.log("Skipping FFmpeg fix (macOS 13+ detected)")
    process.exit(0)
}

const compositorPath = path.join(
    __dirname,
    "../node_modules/@remotion/compositor-darwin-arm64",
)
const homebrewFfmpeg = "/opt/homebrew/bin/ffmpeg"
const homebrewFfprobe = "/opt/homebrew/bin/ffprobe"

// Check if compositor directory exists
if (!fs.existsSync(compositorPath)) {
    console.log("Remotion compositor not found, skipping FFmpeg fix")
    process.exit(0)
}

// Check if Homebrew FFmpeg exists
if (!fs.existsSync(homebrewFfmpeg) || !fs.existsSync(homebrewFfprobe)) {
    console.warn("⚠️  Warning: Homebrew FFmpeg not found at /opt/homebrew/bin/")
    console.warn("   Install it with: brew install ffmpeg")
    process.exit(0)
}

console.log("🔧 Fixing FFmpeg for macOS 12 compatibility...")

// Replace ffmpeg
const ffmpegPath = path.join(compositorPath, "ffmpeg")
const ffmpegBackup = path.join(compositorPath, "ffmpeg.backup")

if (fs.existsSync(ffmpegPath) && !fs.lstatSync(ffmpegPath).isSymbolicLink()) {
    fs.renameSync(ffmpegPath, ffmpegBackup)
    console.log("   ✓ Backed up original ffmpeg")
}

if (fs.existsSync(ffmpegPath)) {
    fs.unlinkSync(ffmpegPath)
}
fs.symlinkSync(homebrewFfmpeg, ffmpegPath)
console.log("   ✓ Linked Homebrew ffmpeg")

// Replace ffprobe
const ffprobePath = path.join(compositorPath, "ffprobe")
const ffprobeBackup = path.join(compositorPath, "ffprobe.backup")

if (fs.existsSync(ffprobePath) && !fs.lstatSync(ffprobePath).isSymbolicLink()) {
    fs.renameSync(ffprobePath, ffprobeBackup)
    console.log("   ✓ Backed up original ffprobe")
}

if (fs.existsSync(ffprobePath)) {
    fs.unlinkSync(ffprobePath)
}
fs.symlinkSync(homebrewFfprobe, ffprobePath)
console.log("   ✓ Linked Homebrew ffprobe")

console.log("✅ FFmpeg fix applied successfully!")
