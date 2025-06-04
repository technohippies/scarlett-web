export function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-neutral-950">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="prose prose-invert max-w-none">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-neutral-100 mb-4">
              Privacy Policy for Scarlett Browser Extension
            </h1>
            <p className="text-neutral-400 text-lg">
              <strong>Last Updated:</strong> June 4, 2025
            </p>
          </div>

          {/* Introduction */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-neutral-200 mb-4">Introduction</h2>
            <p className="text-neutral-300 leading-relaxed">
              Scarlett ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard information when you use our browser extension.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-neutral-200 mb-4">Information We Collect</h2>
            
            <h3 className="text-xl font-medium text-neutral-300 mb-3">Analytics Data</h3>
            <p className="text-neutral-300 leading-relaxed mb-4">
              We use Umami Analytics (a privacy-focused analytics service) to collect anonymous usage statistics to help us improve the extension. This includes:
            </p>
            <ul className="list-disc list-inside space-y-2 text-neutral-300 mb-6">
              <li><strong>Feature Usage Metrics</strong>: Which features you use (chat, study sessions, focus mode, bookmarks, etc.)</li>
              <li><strong>Performance Data</strong>: How often features are accessed and basic usage patterns</li>
              <li><strong>Milestone Events</strong>: Anonymous tracking of study streaks and learning progress</li>
              <li><strong>Technical Information</strong>: Browser type, extension version, and basic system information</li>
            </ul>

            <h3 className="text-xl font-medium text-neutral-300 mb-3">What We DO NOT Collect</h3>
            <ul className="list-disc list-inside space-y-2 text-neutral-300">
              <li><strong>Personal Conversations</strong>: Your AI chat conversations remain completely local on your device</li>
              <li><strong>Personal Information</strong>: We do not collect names, email addresses, or other personally identifiable information</li>
              <li><strong>Browsing History</strong>: We do not track or store your browsing activity outside the extension</li>
              <li><strong>File Contents</strong>: Any documents or content you process remain on your device</li>
              <li><strong>Voice Data</strong>: Speech-to-text processing happens locally on your device</li>
            </ul>
          </section>

          {/* How We Use Information */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-neutral-200 mb-4">How We Use Information</h2>
            <p className="text-neutral-300 leading-relaxed mb-4">
              We use the collected analytics data to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-neutral-300">
              <li>Improve extension features and user experience</li>
              <li>Identify and fix bugs or performance issues</li>
              <li>Understand which features are most valuable to users</li>
              <li>Make informed decisions about future development</li>
            </ul>
          </section>

          {/* Data Storage and Security */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-neutral-200 mb-4">Data Storage and Security</h2>
            
            <h3 className="text-xl font-medium text-neutral-300 mb-3">Local Data</h3>
            <ul className="list-disc list-inside space-y-2 text-neutral-300 mb-6">
              <li>All your personal data (conversations, bookmarks, study progress) is stored locally in your browser</li>
              <li>AI conversations with local models (Jan.ai, Ollama, LM Studio) never leave your device</li>
              <li>Your study materials and progress are synced only within your browser's local storage</li>
            </ul>

            <h3 className="text-xl font-medium text-neutral-300 mb-3">Analytics Data</h3>
            <ul className="list-disc list-inside space-y-2 text-neutral-300">
              <li>Anonymous usage analytics are processed by Umami Analytics</li>
              <li>Data is stored on secure servers and automatically anonymized</li>
              <li>No personal identifiers are transmitted or stored</li>
            </ul>
          </section>

          {/* Third-Party Services */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-neutral-200 mb-4">Third-Party Services</h2>
            
            <h3 className="text-xl font-medium text-neutral-300 mb-3">Umami Analytics</h3>
            <p className="text-neutral-300 leading-relaxed mb-4">
              We use Umami Analytics (umami.is) for privacy-focused website analytics. Umami:
            </p>
            <ul className="list-disc list-inside space-y-2 text-neutral-300 mb-6">
              <li>Does not use cookies or track personal information</li>
              <li>Complies with GDPR and other privacy regulations</li>
              <li>Provides only aggregated, anonymous data</li>
              <li>More information: <a href="https://umami.is/privacy" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">Umami Privacy Policy</a></li>
            </ul>

            <h3 className="text-xl font-medium text-neutral-300 mb-3">Local AI Models</h3>
            <p className="text-neutral-300 leading-relaxed mb-4">
              The extension supports integration with local AI services (Jan.ai, Ollama, LM Studio):
            </p>
            <ul className="list-disc list-inside space-y-2 text-neutral-300 mb-6">
              <li>All AI conversations happen locally on your device</li>
              <li>No conversation data is transmitted to external servers</li>
              <li>You maintain complete control over your AI interactions</li>
            </ul>

            <h3 className="text-xl font-medium text-neutral-300 mb-3">ElevenLabs Text-to-Speech (Optional)</h3>
            <p className="text-neutral-300 leading-relaxed mb-4">
              If you choose to use ElevenLabs for text-to-speech functionality:
            </p>
            <ul className="list-disc list-inside space-y-2 text-neutral-300">
              <li><strong>Text Data Transmission</strong>: When you use ElevenLabs TTS, the text you want to convert to speech is sent to ElevenLabs' servers</li>
              <li><strong>User Choice</strong>: This is an optional feature that you can enable/disable in settings</li>
              <li><strong>API Key Required</strong>: You must provide your own ElevenLabs API key to use this service</li>
              <li><strong>No Storage by Us</strong>: We do not store or access the text sent to ElevenLabs - it goes directly from your extension to their servers</li>
              <li><strong>ElevenLabs Privacy</strong>: Your data handling with ElevenLabs is governed by their privacy policy: <a href="https://elevenlabs.io/privacy" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">ElevenLabs Privacy Policy</a></li>
            </ul>
          </section>

          {/* Your Rights and Choices */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-neutral-200 mb-4">Your Rights and Choices</h2>
            
            <h3 className="text-xl font-medium text-neutral-300 mb-3">Data Control</h3>
            <ul className="list-disc list-inside space-y-2 text-neutral-300 mb-6">
              <li><strong>Disable Analytics</strong>: You can disable analytics collection in the extension settings</li>
              <li><strong>Local Data</strong>: You can clear all local extension data through your browser settings</li>
              <li><strong>Feature Control</strong>: You can enable/disable specific features as needed</li>
            </ul>

            <h3 className="text-xl font-medium text-neutral-300 mb-3">Access and Deletion</h3>
            <ul className="list-disc list-inside space-y-2 text-neutral-300">
              <li>Analytics data is anonymous and cannot be traced back to individual users</li>
              <li>You can request information about our data practices by contacting us</li>
              <li>Local data can be deleted by uninstalling the extension or clearing browser data</li>
            </ul>
          </section>

          {/* Children's Privacy */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-neutral-200 mb-4">Children's Privacy</h2>
            <p className="text-neutral-300 leading-relaxed">
              Since we do not collect any personal information from any users (only anonymous analytics data), there are no special privacy concerns regarding children's use of our extension. All data collection is anonymous and cannot be linked to any individual user, regardless of age.
            </p>
          </section>

          {/* International Users */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-neutral-200 mb-4">International Users</h2>
            <p className="text-neutral-300 leading-relaxed">
              Our extension is available globally. By using our extension, you consent to the processing of your information as described in this policy.
            </p>
          </section>

          {/* Updates to This Policy */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-neutral-200 mb-4">Updates to This Policy</h2>
            <p className="text-neutral-300 leading-relaxed mb-4">
              We may update this Privacy Policy periodically. We will notify users of any material changes through:
            </p>
            <ul className="list-disc list-inside space-y-2 text-neutral-300">
              <li>Extension update notifications</li>
              <li>Posting the updated policy on our website</li>
              <li>GitHub repository updates</li>
            </ul>
          </section>

          {/* Open Source Transparency */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-neutral-200 mb-4">Open Source Transparency</h2>
            <p className="text-neutral-300 leading-relaxed mb-4">
              Scarlett is open source software. You can review our code and data practices at:
            </p>
            <ul className="list-disc list-inside space-y-2 text-neutral-300">
              <li>GitHub Repository: <a href="https://github.com/technohippies/scarlett" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">https://github.com/technohippies/scarlett</a></li>
              <li>You can verify our privacy claims by examining the source code</li>
            </ul>
          </section>

          {/* Contact Information */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-neutral-200 mb-4">Contact Information</h2>
            <p className="text-neutral-300 leading-relaxed mb-4">
              If you have questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <ul className="list-disc list-inside space-y-2 text-neutral-300">
              <li><strong>Email</strong>: [Your contact email]</li>
              <li><strong>GitHub Issues</strong>: <a href="https://github.com/technohippies/scarlett/issues" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">https://github.com/technohippies/scarlett/issues</a></li>
              <li><strong>Website</strong>: [Your website URL]</li>
            </ul>
          </section>

          {/* Legal Basis for Processing (GDPR) */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-neutral-200 mb-4">Legal Basis for Processing (GDPR)</h2>
            <p className="text-neutral-300 leading-relaxed mb-4">
              For users in the European Union, our legal basis for processing your information includes:
            </p>
            <ul className="list-disc list-inside space-y-2 text-neutral-300">
              <li><strong>Legitimate Interest</strong>: To improve our extension and provide better user experience</li>
              <li><strong>Consent</strong>: When you choose to use our extension and its features</li>
            </ul>
          </section>

          {/* Data Retention */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-neutral-200 mb-4">Data Retention</h2>
            <ul className="list-disc list-inside space-y-2 text-neutral-300">
              <li><strong>Analytics Data</strong>: Retained for up to 24 months for statistical analysis</li>
              <li><strong>Local Data</strong>: Stored locally until you delete the extension or clear browser data</li>
              <li><strong>No Personal Data</strong>: Since we don't collect personal information, there's no personal data to retain</li>
            </ul>
          </section>

          {/* Footer */}
          <section className="mt-12 pt-8 border-t border-neutral-800">
            <p className="text-neutral-400 text-sm italic text-center">
              This privacy policy is effective as of the date listed above and governs our collection and use of information from that date forward.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
} 