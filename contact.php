<?php
declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');
function respond(int $code, bool $success, string $message): never {
    http_response_code($code);
    echo json_encode(['success' => $success, 'message' => $message], JSON_UNESCAPED_UNICODE | JSON_INVALID_UTF8_SUBSTITUTE);
    exit;
}
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    respond(405, false, 'Please submit the enquiry form.');
}
if ((int)($_SERVER['CONTENT_LENGTH'] ?? 0) > 20000) respond(413, false, 'Your enquiry is too long.');
$configText = file_get_contents(__DIR__ . '/config/config.js');
if (!$configText || !preg_match('/window\.SITE_CONFIG\s*=\s*(\{.*\})\s*;/s', $configText, $matches)) respond(500, false, 'The contact service is unavailable.');
$config = json_decode($matches[1], true);
if (!is_array($config)) respond(500, false, 'The contact configuration is invalid.');
function field(string $name): string { return isset($_POST[$name]) && is_string($_POST[$name]) ? trim($_POST[$name]) : ''; }
if (field('website_check') !== '') respond(422, false, 'Unable to accept this enquiry.');
$name = field('name'); $email = field('email'); $service = field('service'); $message = field('message');
if (strlen($name) < 2 || strlen($name) > 100 || preg_match('/[\r\n]/', $name)) respond(422, false, 'Please enter your name.');
if (strlen($email) > 254 || !filter_var($email, FILTER_VALIDATE_EMAIL) || preg_match('/[\r\n]/', $email)) respond(422, false, 'Please enter a valid email address.');
if (!in_array($service, ['interior', 'exterior', 'unsure'], true)) respond(422, false, 'Please select a painting service.');
if (strlen($message) < 10 || strlen($message) > 5000) respond(422, false, 'Please describe your project in 10–5000 characters.');
if (field('privacy_consent') !== '1') respond(422, false, 'Please confirm the Privacy Policy.');
$recipient = $config['email'] ?? '';
if (!is_string($recipient) || !filter_var($recipient, FILTER_VALIDATE_EMAIL) || preg_match('/[\r\n]/', $recipient) || str_ends_with(strtolower($recipient), '.example')) respond(503, false, 'Enquiries are not available yet. Please try again later.');
// Server-side throttling. The lock is retained through mail() to block concurrent duplicates.
$key = hash('sha256', __DIR__ . '|' . ($_SERVER['REMOTE_ADDR'] ?? 'unknown'));
$lock = fopen(sys_get_temp_dir() . '/painting-enquiry-' . $key . '.lock', 'c+');
if (!$lock || !flock($lock, LOCK_EX)) respond(503, false, 'Please try again later.');
$last = (int)stream_get_contents($lock);
if ($last && time() - $last < 45) { flock($lock, LOCK_UN); fclose($lock); respond(429, false, 'Please wait a moment before sending another enquiry.'); }
$brand = preg_replace('/[\r\n]/', '', (string)($config['companyName'] ?? 'Painting enquiry'));
$domain = substr(strrchr($recipient, '@'), 1);
$headers = ['From' => 'website@' . $domain, 'Reply-To' => $email, 'Content-Type' => 'text/plain; charset=UTF-8'];
$subject = '=?UTF-8?B?' . base64_encode($brand . ' — ' . $service . ' enquiry') . '?=';
$body = "Name: $name\nEmail: $email\nService: $service\nPrivacy consent: yes\n\n$message";
$sent = function_exists('mail') && @mail($recipient, $subject, $body, $headers);
if ($sent) { rewind($lock); ftruncate($lock, 0); fwrite($lock, (string)time()); fflush($lock); }
flock($lock, LOCK_UN); fclose($lock);
if (!$sent) respond(502, false, 'The message could not be sent. Please try again later.');
respond(200, true, (string)($config['formSuccessMessage'] ?? 'Успешно отправлено'));
