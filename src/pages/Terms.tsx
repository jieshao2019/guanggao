import React from 'react';
import { ArrowLeft, FileText, AlertTriangle, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white">
        <div className="px-4 py-3 flex items-center">
          <Link to="/" className="text-gray-600">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="ml-4 text-xl font-bold">服务条款</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto p-4">
        <div className="bg-white rounded-lg p-6 space-y-6">
          {/* Introduction */}
          <div>
            <h2 className="text-lg font-bold mb-2">服务协议</h2>
            <p className="text-gray-600 leading-relaxed">
              欢迎使用我们的服务。本协议是您与平台之间关于使用平台服务所订立的协议。请您仔细阅读以下全部内容。
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-6">
            <section>
              <h3 className="font-bold mb-2">1. 服务说明</h3>
              <div className="text-gray-600 space-y-2">
                <p>
                  1.1 平台提供广告观看、游戏娱乐、社交互动等服务。
                </p>
                <p>
                  1.2 用户可以通过观看广告获取积分奖励。
                </p>
                <p>
                  1.3 平台保留随时修改或中断服务的权利。
                </p>
              </div>
            </section>

            <section>
              <h3 className="font-bold mb-2">2. 账号注册</h3>
              <div className="text-gray-600 space-y-2">
                <p>
                  2.1 用户注册时应提供真实、准确的信息。
                </p>
                <p>
                  2.2 用户应妥善保管账号密码，对账号行为负责。
                </p>
                <p>
                  2.3 平台有权对违规账号进行处理。
                </p>
              </div>
            </section>

            <section>
              <h3 className="font-bold mb-2">3. 用户行为规范</h3>
              <div className="text-gray-600 space-y-2">
                <p>
                  3.1 用户应遵守相关法律法规。
                </p>
                <p>
                  3.2 禁止利用平台进行违法违规活动。
                </p>
                <p>
                  3.3 禁止干扰平台正常运营。
                </p>
              </div>
            </section>

            <section>
              <h3 className="font-bold mb-2">4. 收益规则</h3>
              <div className="text-gray-600 space-y-2">
                <p>
                  4.1 用户通过正常观看广告获取积分。
                </p>
                <p>
                  4.2 积分可按规则兑换现金。
                </p>
                <p>
                  4.3 平台有权调整收益规则。
                </p>
              </div>
            </section>
          </div>

          {/* Important Notes */}
          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-yellow-800 mb-1">重要提示</h4>
                <p className="text-yellow-700 text-sm">
                  使用本平台服务即表示您同意本协议的全部条款。我们保留随时修改本协议的权利，修改后的协议将在平台上公布。
                </p>
              </div>
            </div>
          </div>

          {/* Help Section */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-start space-x-3">
              <HelpCircle className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold mb-1">需要帮助？</h4>
                <p className="text-gray-600 text-sm">
                  如果您对服务条款有任何疑问，请联系客服获取帮助。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}