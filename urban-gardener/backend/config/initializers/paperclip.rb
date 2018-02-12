Paperclip::Attachment.default_options[:url] = ':s3_path_url'
Paperclip::Attachment.default_options[:path] = '/avatar/:filename'
Paperclip::Attachment.default_options[:s3_host_name] = 's3.us-east-2.amazonaws.com'
Paperclip::Attachment.default_options[:use_timestamp] = false

require 'paperclip/media_type_spoof_detector'
module Paperclip
  class MediaTypeSpoofDetector
    def spoofed?
      false
    end
  end
end
